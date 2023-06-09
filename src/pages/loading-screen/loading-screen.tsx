function LoadingScreen(): JSX.Element {
  return (
    <div className="loading">
      <svg style={{width:'16px', height:'12px', marginLeft: '20px'}}>
        <polyline id="back" points="1 6 4 6 6 11 10 1 12 6 15 6"></polyline>
        <polyline id="front" points="1 6 4 6 6 11 10 1 12 6 15 6"></polyline>
      </svg>
      <p>Loading...</p>
    </div>
  );
}

export default LoadingScreen;
