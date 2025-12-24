import React from "react";

export const HomeHeroImageStrip = () => {
  return (
    <section className="mt-12 md:mt-16 lg:mt-20 py-[40px] bg-white">
      <div className="container max-w-[1100px] mx-auto px-4">
        <div
          className="rounded-3xl overflow-hidden shadow-md"
          data-aos="zoom-in"
        >
          <img
            src="https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?w=1400&auto=compress&cs=tinysrgb"
            alt="Black students and professionals networking at a job fair"
            className="w-full h-[260px] md:h-[340px] object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default HomeHeroImageStrip;
