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
      { id: '1tozZ9peXUvVRNytbgMXKCt8Sc1X7x0og', name: 'aptis_buoi_1.2.mkv', mimeType: 'video/x-matroska', url: "https://drive.google.com/file/d/16l_Rd-vjhtxxX7rbjCqDGhilZHJKvXcE/view?usp=drive_link" },
      { id: '2tozZ9peXUvVRNytbgMXKCt8Sc1X7x0og', name: 'aptis_buoi_1.1.mkv', mimeType: 'video/x-matroska', url: "https://drive.google.com/file/d/1DB0m_kNnFSZkn2saLRdY_X2n4myHq9ha/view?usp=drive_link" }
    ],
    'Buổi 2: Từ vựng': [
      { id: '1tozZ9peXUvVRNytbgMXKCt8Sc1X7x0og', name: 'aptis_buoi_2.mkv', mimeType: 'video/x-matroska', url: "https://drive.google.com/file/d/1tozZ9peXUvVRNytbgMXKCt8Sc1X7x0og/view?usp=drive_link"  }
    ],
    'Buổi 3: Kỹ năng đọc': [
      { id: '1tozZ9peXUvVRNytbgMXKCt8Sc1X7x0og', name: 'aptis_buoi_3.mkv', mimeType: 'video/x-matroska', url: "https://drive.google.com/file/d/1259zhfuO3cSQGxb5OeoBA4pvJdNdur1R/view?usp=drive_link"  }
    ],
    'Buổi 4: Kỹ năng viết': [
      { id: '1MWoOYTaFHo1HY-P4ygLQxtwdNxOOC8oc', name: 'aptis_buoi_5.mkv', mimeType: 'video/x-matroska', url: "https://drive.google.com/file/d/1W_siy93xFghu743LQqfxWFQXtd7blkV5/view?usp=drive_link"  }
    ],
    'Buổi 5: Nói và nghe': [
      { id: '1MWoOYTaFHo1HY-P4ygLQxtwdNxOOC8oc', name: 'aptis_buoi_5.mkv', mimeType: 'video/x-matroska', url: "https://drive.google.com/file/d/1MWoOYTaFHo1HY-P4ygLQxtwdNxOOC8oc/view?usp=drive_link"  }
    ],
    'Buổi 6: Tổng ôn': [
      { id: '15yC6c1BXJiwQvNwIDkhYClI2nCENj6-J', name: 'aptis_buoi_6.mkv', mimeType: 'video/x-matroska', url: "https://drive.google.com/file/d/1SOBD5G1Al6Am-QzjOEjxAQD0zUIaQdnA/view?usp=drive_link"  }
    ],
    'Buổi 7: Luyện đề': [
      { id: '15yC6c1BXJiwQvNwIDkhYClI2nCENj6-J', name: 'aptis_buoi_7.mkv', mimeType: 'video/x-matroska', url: "https://drive.google.com/file/d/1TSPq67rj5Jn5G8z2ic46YqcaJ7H30afO/view?usp=drive_link"  }
    ],
    'Buổi 8: Listening question 14-15': [
      { id: '15yC6c1BXJiwQvNwIDkhYClI2nCENj6-J', name: 'aptis_buoi_8.mkv', mimeType: 'video/x-matroska', url: "https://drive.google.com/file/d/15yC6c1BXJiwQvNwIDkhYClI2nCENj6-J/view?usp=drive_link"  }
    ],
    'Buổi 9: Writing Part 4': [
      { id: '1fLzevQp5L56Jh8Ifyoy-ooE7nMVneYZ9', name: 'aptis_buoi_9.mkv', mimeType: 'video/x-matroska', url: "https://drive.google.com/file/d/1fLzevQp5L56Jh8Ifyoy-ooE7nMVneYZ9/view?usp=drive_link"  }
    ],
    'Buổi 10: Giải đề': [
      { id: '1rOkAtiHfh8N7ZzbCsHULGHtXm6TOLAKe', name: 'aptis_buoi_10.mkv', mimeType: 'video/x-matroska', url: "https://drive.google.com/file/d/1rOkAtiHfh8N7ZzbCsHULGHtXm6TOLAKe/view?usp=drive_link"  }
    ],
    'Buổi 11: Speaking Part 1': [
      { id: '1rOkAtiHfh8N7ZzbCsHULGH1tXm6TOLAKe', name: 'aptis_buoi_11.mkv', mimeType: 'video/x-matroska', url: "https://drive.google.com/drive/folders/1LdSAVnO8uaemMrtCAJ4FH-OGm-GCfx8g?usp=sharing"  }
    ],
    'Buổi 12: Speaking Part 4': [
      { id: '1rOkAtiHfh8N7ZzbCs5HULGHtXm6TOLAKe', name: 'aptis_buoi_12.mkv', mimeType: 'video/x-matroska', url: "https://drive.google.com/drive/folders/1wgBODjo6-mFi_Uab1dprjem2Q5UtDPqX?usp=sharing"  }
    ],
    'Buổi 13: Speaking Part 2': [
      { id: '1rOkAtiHfh8N7ZzbCsHULG4HtXm6TOLAKe', name: 'aptis_buoi_13.mkv', mimeType: 'video/x-matroska', url: "https://drive.google.com/drive/folders/1UtAKdKVFs3ZL1BtMfw_duOG2fbMDGGxU?usp=sharing"  }
    ],
    'Buổi 14: Speaking Part 3': [
      { id: '1rOkAtiHfh8N7ZzbCsHULGHtXm6TO3LAKe', name: 'aptis_buoi_14.mkv', mimeType: 'video/x-matroska', url: "https://drive.google.com/drive/folders/1DTkcaxqsxRI5QYq4XqBgSJT_fXYoei0g?usp=sharing"  }
    ],
    'Buổi 15: Bổ trợ nâng cao Speaking - Writing': [
      { id: '1rOkAtiHfh8N7ZzbCsHULGHtXm6TOLA2e', name: 'aptis_buoi_15.mkv', mimeType: 'video/x-matroska', url: "https://drive.google.com/drive/folders/1T29A40rHb9dggKk0-46dIaXqh3Pqn3Os?usp=sharingk"  }
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
