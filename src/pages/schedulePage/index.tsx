import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { DriveFile } from '../../types';
import { VideoCollapse } from './_components/VideoCollapse';
import { VideoModal } from './_components/VideoModal';
import useDevToolsDetection from '../../hooks/useDevToolsDetection';
import { useNavigate } from 'react-router-dom';
import { userLocalStorage } from '../../config/userLocal';
import { authServices } from '../../config/authServices';

export default function Schedule() {
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [user, setUser] = useState<any>(null);
  const [selectedVideo, setSelectedVideo] = useState<DriveFile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isDevToolsOpen = useDevToolsDetection();
  const navigate = useNavigate();

  const buoiTitles: Record<string, string> = {
    '1': 'Buổi 1: Ôn tập',
    '2': 'Buổi 2: Từ vựng',
    '3': 'Buổi 3: Kỹ năng đọc',
    '4': 'Buổi 4: Kỹ năng viết',
    '5': 'Buổi 5: Nói và nghe',
    '6': 'Buổi 6: Tổng ôn',
    '7': 'Buổi 7: Luyện đề'
  };

  useEffect(() => {
    const token = userLocalStorage.get()?.token;
    if (token) {
      authServices.getUserInfo(token)
        .then(res => {
          setUser(res.data); // Lưu user để kiểm tra is_video
        })
        .catch(err => {
          console.error('err: ', err);
          localStorage.removeItem('USER_LOCAL');
          navigate('/auth/login');
        });
    }
  }, [navigate]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const folderIds = [
          '1fKjjymGhhcoq3Cj_P9XA8WVgP0muPD9x',
          '1CRRO0jI7epxH9GfN5zTzseZjaMMiC0n4'
        ];
        const fetchPromises = folderIds.map(id =>
          fetch(`https://aptisapi-production.up.railway.app/auth/videos?folderId=${id}`).then(res => res.json())
        );
        const results = await Promise.all(fetchPromises);
        const combinedFiles = results.flat();

        const sortedFiles = combinedFiles.sort((a, b) => {
          const getNum = (name: string) => parseFloat(name.match(/buoi_(\d+(\.\d+)?)/)?.[1] ?? '0');
          return getNum(a.name) - getNum(b.name);
        });

        setFiles(sortedFiles);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFiles();
  }, []);

  const groupedByBuoi = files.reduce((acc, file) => {
    const match = file.name.match(/buoi_(\d+)/);
    const buoiNum = match ? match[1] : 'Khác';
    const buoiTitle = buoiTitles[buoiNum] || `Buổi ${buoiNum}`;
    if (!acc[buoiTitle]) acc[buoiTitle] = [];
    acc[buoiTitle].push(file);
    return acc;
  }, {} as Record<string, DriveFile[]>);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <Helmet>
        <title>Bài giảng | PassKey Center</title>
        <meta name="description" content="Theo dõi lịch học chi tiết, thời gian và phòng học của các khóa luyện thi APTIS bạn đã đăng ký tại PassKey Center." />
      </Helmet>
      <h2 className="text-2xl font-bold mb-6 flex justify-center">Danh sách Video</h2>
      {!isDevToolsOpen ? (
        <VideoCollapse
          groupedByBuoi={groupedByBuoi}
          onSelectVideo={(file) => {
            setSelectedVideo(file);
            setIsModalOpen(true);
          }}
          isVideoAllowed={user?.is_video ?? false}
        />
      ) : (
        <p className="text-red-500">Bạn đang mở DevTools. Nội dung đã bị ẩn.</p>
      )}
      <VideoModal
        selectedVideo={selectedVideo}
        isOpen={isModalOpen}
        isDevToolsOpen={isDevToolsOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
