const LoadingTrade = () => {
	return (
		<div className="fixed flex h-screen w-full items-center justify-center bg-opacityBlack">
			<div className="flex w-1/2 justify-center py-5">
				<p className="rounded-md border-2 border-sky-500 p-3 text-sky-500">
					下單中...請稍候...
				</p>
				<span className="relative -ml-3 -mt-2 flex h-5 w-5">
					<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
					<span className="relative inline-flex h-5 w-5 rounded-full bg-sky-500"></span>
				</span>
			</div>
		</div>
	);
};
export default LoadingTrade;
