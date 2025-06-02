import { Modal } from 'antd';
import { DriveFile } from '../../../types';

interface VideoModalProps {
  selectedVideo: DriveFile | null;
  isOpen: boolean;
  isDevToolsOpen: boolean
  onClose: () => void;
}

export const VideoModal = ({ selectedVideo, isOpen, onClose, isDevToolsOpen }: VideoModalProps) => (
  <Modal
    title={selectedVideo?.name}
    open={isOpen}
    onCancel={onClose}
    footer={null}
    width={800}
  >
    {selectedVideo && !isDevToolsOpen &&(
      <video
        controls
        width="100%"
        controlsList="nodownload noremoteplayback"
        disablePictureInPicture
        src={`https://aptisapi-production.up.railway.app/auth/video/${selectedVideo.id}`}
        onContextMenu={e => e.preventDefault()}
      />
    )}
  </Modal>
);
