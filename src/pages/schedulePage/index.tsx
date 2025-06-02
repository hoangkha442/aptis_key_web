import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
}

export default function Schedule() {
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [isInspecting, setIsInspecting] = useState(false); // Thêm state để ẩn video

  useEffect(() => {
    fetch('http://localhost:8080/auth/videos?folderId=1fKjjymGhhcoq3Cj_P9XA8WVgP0muPD9x')
      .then(response => response.json())
      .then(data => setFiles(data))
      .catch(err => console.error(err));

    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (!isMobile) {
      const detectDevTools = () => {
        const threshold = 160;
        if (
          window.outerWidth - window.innerWidth > threshold ||
          window.outerHeight - window.innerHeight > threshold
        ) {
          setIsInspecting(true); // Phát hiện DevTools thì ẩn video
        } else {
          setIsInspecting(false); // Không phát hiện thì hiện video
        }
      };

      const intervalId = setInterval(detectDevTools, 1000);

      return () => clearInterval(intervalId);
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <Helmet>
        <title>Bài giảng | PassKey Center</title>
        <meta
          name="description"
          content="Theo dõi lịch học chi tiết, thời gian và phòng học của các khóa luyện thi APTIS bạn đã đăng ký tại PassKey Center."
        />
      </Helmet>
      <h2>Danh sách video</h2>
      {!isInspecting && files.map((file) => ( // Ẩn nếu đang inspect
        <div key={file.id}>
          <p>{file.name}</p>
          <video
            controls
            width="400"
            controlsList="nodownload noremoteplayback"
            disablePictureInPicture
            src={`http://localhost:8080/auth/video/${file.id}`}
            onContextMenu={e => e.preventDefault()}
          />
        </div>
      ))}
      {isInspecting && <p className="text-red-500">Bạn đang mở DevTools. Nội dung đã bị ẩn.</p>}
    </div>
  );
}
