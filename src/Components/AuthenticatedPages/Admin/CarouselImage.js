import quote from "../../../../src/Quote.jpg";
import admin from "../../../../src/Admin.jpg";
import admin2 from "../../../../src/Admin2.jpg";

export const CarouselImage = () => {
	return (
		<div
			id="carouselExampleDark"
			className="carousel carousel-dark slide"
			data-bs-ride="carousel"
		>
			<div className="carousel-indicators">
				<button
					type="button"
					data-bs-target="#carouselExampleDark"
					data-bs-slide-to="0"
					className="active"
					aria-current="true"
					aria-label="Slide 1"
				></button>
				<button
					type="button"
					data-bs-target="#carouselExampleDark"
					data-bs-slide-to="1"
					aria-label="Slide 2"
				></button>
				<button
					type="button"
					data-bs-target="#carouselExampleDark"
					data-bs-slide-to="2"
					aria-label="Slide 3"
				></button>
			</div>
			<div className="carousel-inner">
				<div className="carousel-item active" data-bs-interval="3000">
					<img src={quote} className="d-block w-100" alt="" height={430} />
				</div>
				<div className="carousel-item" data-bs-interval="3000">
					<img src={admin} className="d-block w-100" alt="" height={430} />
					<div className="carousel-caption d-none d-md-block">
						<h5>Message For You</h5>
						<p>
							Our office and the people in it wouldn't be as efficient without
							you.
						</p>
					</div>
				</div>
				<div className="carousel-item" data-bs-interval="3000">
					<img src={admin2} className="d-block w-100" alt="" height={430} />
				</div>
			</div>
			<button
				className="carousel-control-prev"
				type="button"
				data-bs-target="#carouselExampleDark"
				data-bs-slide="prev"
			>
				<span className="carousel-control-prev-icon" aria-hidden="true"></span>
				<span className="visually-hidden">Previous</span>
			</button>
			<button
				className="carousel-control-next"
				type="button"
				data-bs-target="#carouselExampleDark"
				data-bs-slide="next"
			>
				<span className="carousel-control-next-icon" aria-hidden="true"></span>
				<span className="visually-hidden">Next</span>
			</button>
		</div>
	);
};
