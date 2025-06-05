import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { DriveFile } from '../../types';
import { VideoCollapse } from './_components/VideoCollapse';
// import useDevToolsDetection from '../../hooks/useDevToolsDetection';
import { useNavigate } from 'react-router-dom';
import { userLocalStorage } from '../../config/userLocal';
import { authServices } from '../../config/authServices';

export default function Schedule() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();



  // Hardcoded groupedByBuoi data (no API fetch)
  const groupedByBuoi: Record<string, DriveFile[]> = {
    'Buổi 1: Ôn tập': [
      { id: '1tozZ9peXUvVRNytbgMXKCt8Sc1X7x0og', name: 'aptis_buoi_1.2.mkv', mimeType: 'video/x-matroska', url: "" },
      { id: '2tozZ9peXUvVRNytbgMXKCt8Sc1X7x0og', name: 'aptis_buoi_1.1.mkv', mimeType: 'video/x-matroska', url: "" }
    ],
    'Buổi 2: Từ vựng': [
      { id: '1tozZ9peXUvVRNytbgMXKCt8Sc1X7x0og', name: 'aptis_buoi_2.mkv', mimeType: 'video/x-matroska', url: ""  }
    ],
    'Buổi 3: Kỹ năng đọc': [
      { id: '1tozZ9peXUvVRNytbgMXKCt8Sc1X7x0og', name: 'aptis_buoi_3.mkv', mimeType: 'video/x-matroska', url: ""  }
    ],
    'Buổi 4: Kỹ năng viết': [
      { id: '1MWoOYTaFHo1HY-P4ygLQxtwdNxOOC8oc', name: 'aptis_buoi_5.mkv', mimeType: 'video/x-matroska', url: ""  }
    ],
    'Buổi 5: Nói và nghe': [
      { id: '1MWoOYTaFHo1HY-P4ygLQxtwdNxOOC8oc', name: 'aptis_buoi_5.mkv', mimeType: 'video/x-matroska', url: ""  }
    ],
    'Buổi 6: Tổng ôn': [
      { id: '15yC6c1BXJiwQvNwIDkhYClI2nCENj6-J', name: 'aptis_buoi_6.mkv', mimeType: 'video/x-matroska', url: ""  }
    ],
    'Buổi 7: Luyện đề': [
      { id: '15yC6c1BXJiwQvNwIDkhYClI2nCENj6-J', name: 'aptis_buoi_7.mkv', mimeType: 'video/x-matroska', url: ""  }
    ],
    'Buổi 8: Listening question 14-15': [
      { id: '15yC6c1BXJiwQvNwIDkhYClI2nCENj6-J', name: 'aptis_buoi_8.mkv', mimeType: 'video/x-matroska', url: ""  }
    ],
    'Buổi 9: Writing Part 4': [
      { id: '1fLzevQp5L56Jh8Ifyoy-ooE7nMVneYZ9', name: 'aptis_buoi_9.mkv', mimeType: 'video/x-matroska', url: ""  }
    ],
    'Buổi 10: Giải đề': [
      { id: '1rOkAtiHfh8N7ZzbCsHULGHtXm6TOLAKe', name: 'aptis_buoi_10.mkv', mimeType: 'video/x-matroska', url: ""  }
    ]
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

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <Helmet>
        <title>Bài giảng | PassKey Center</title>
        <meta name="description" content="Theo dõi lịch học chi tiết, thời gian và phòng học của các khóa luyện thi APTIS bạn đã đăng ký tại PassKey Center." />
      </Helmet>
      <h2 className="text-2xl font-bold mb-6 flex justify-center">Danh sách Video</h2>
      <VideoCollapse
        groupedByBuoi={groupedByBuoi}
        isVideoAllowed={user?.is_video ?? false}
      />
    </div>
  );
}
