import ErrorGif from "../assets/error404.gif"

const Error404 = () => {

	const handle404 = () => {
		console.log("do you want to do....")
	}

	return (
		<div className="fixed flex h-screen w-full items-center justify-center bg-black">
			<div className="flex w-1/2 justify-center py-5">
				<button onClick={handle404}>
					<img src={ErrorGif} alt="ErrorPage" />
				</button>
			</div>
		</div>
	)
}
export default Error404