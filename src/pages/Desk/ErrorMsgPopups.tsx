interface Props {
	errorMessage: string;
	handleCloseErrorPopups: () => void;
}

const ErrorMsgPopups = ({ errorMessage, handleCloseErrorPopups }: Props) => {
	return (
		<div className="fixed flex h-screen w-full items-center justify-center bg-opacityBlack">
			<div className="w-3/4 bg-bodyBgc">
				<p className="py-3 text-center font-black text-white">注 意</p>
				<div className="bg-white">
					<p className="py-10 text-center font-black">{errorMessage}</p>
					<div className="flex justify-center py-5">
						<button
							className="w-1/3 rounded-full bg-black py-2 text-sm font-black text-white"
							onClick={handleCloseErrorPopups}
						>
							確認
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ErrorMsgPopups;
