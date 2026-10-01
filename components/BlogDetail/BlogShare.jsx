'use client';
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
    WhatsappIcon,
} from 'react-share';

export default function BlogShare({ url }) {
    return (
        <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Share:</span>
            <div className="flex items-center gap-3">
                <FacebookShareButton url={url}>
                    <FacebookIcon size={32} round />
                </FacebookShareButton>
                <TwitterShareButton url={url}>
                    <TwitterIcon size={32} round />
                </TwitterShareButton>
                <LinkedinShareButton url={url}>
                    <LinkedinIcon size={32} round />
                </LinkedinShareButton>
                <WhatsappShareButton url={url}>
                    <WhatsappIcon size={32} round />
                </WhatsappShareButton>
            </div>
        </div>
    );
}
