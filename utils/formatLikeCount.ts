// Format Like Count - (eg: 1.2K, 2M)

const formatLikeCount = (likeCount: number): string => {
  if (likeCount < 1000) {
    return likeCount.toString();
  } else if (likeCount < 1000000) {
    return (likeCount / 1000).toFixed(1) + 'K';
  } else {
    return (likeCount / 1000000).toFixed(1) + 'M';
  }
};

export default formatLikeCount;
