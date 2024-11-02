import React, { useEffect } from 'react';
import { Post } from '../Types/types';

interface ModalProps {
    post: Post;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ post, onClose }) => {

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
                onClose();
            }
        };
        document.addEventListener('click', handleOutsideClick);
        return () => document.removeEventListener('click', handleOutsideClick);
    }, [onClose]);

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h2>{post.title}</h2>
                <p>{post.body}</p>
                <button className='close-button' onClick={onClose}>
                    <svg width="26" height="26" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Modal;
