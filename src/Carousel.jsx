import { Carousel } from "antd";

export function CarouselContent() {
  return (
    <div className="carousel-wrapper">
      <Carousel autoplay>
        <div className="carousel-slide" style={{ borderRadius: "10px", overflow: "hidden" }}>
          <img
            style={{
              maxHeight: "600px",
              width: "100%",
              borderRadius: "10px", // Apply border radius to the image
            }}
            src="src/image/Paket-nelpon-telkomsel.jpg"
            alt=""
          />
        </div>
        <div className="carousel-slide" style={{ borderRadius: "10px", overflow: "hidden" }}>
          <img
            style={{
              maxHeight: "600px",
              width: "100%",
              borderRadius: "10px", // Apply border radius to the image
            }}
            src="src/image/banner_three.jpg"
            alt=""
          />
        </div>
        <div className="carousel-slide" style={{ borderRadius: "10px", overflow: "hidden" }}>
          <img
            style={{
              maxHeight: "750px",
              height: "300m",
              width: "100%",
              borderRadius: "10px", // Apply border radius to the image
            }}
            src="src/image/banner_xl.jpg"
            alt=""
          />
        </div>
        <div className="carousel-slide" style={{ borderRadius: "10px", overflow: "hidden" }}>
          <img
            style={{
              maxHeight: "750px",
              height: "300m",
              width: "100%",
              borderRadius: "10px", // Apply border radius to the image
            }}
            src="src/image/banner_indosat.jpg"
            alt=""
          />
        </div>
      </Carousel>
    </div>
  );
}
