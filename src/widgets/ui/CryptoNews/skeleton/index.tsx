import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const NewsItemSkeleton: React.FC = () => (
  <div className="slide-content" >
    <div className="news-info" style={{ marginLeft: "15px", marginTop: "15px"  }}>
      <div className="user-details">
        <Skeleton circle height={50} width={50} />
        <Skeleton height={20} width={150} style={{ marginLeft: "10px" }} />
      </div>
      <Skeleton height={20} width={60} style={{ marginTop: "10px", marginRight: "10px" }} />
    </div>
    <div className="news-description" style={{ marginLeft: "15px" }}>
      <Skeleton height={25} width={`60%`} />
      <Skeleton height={20} width={`90%`} />
      <Skeleton height={20} width={`90%`} style={{ marginTop: "5px" }} />
    </div>
  </div>
);

export default NewsItemSkeleton;
