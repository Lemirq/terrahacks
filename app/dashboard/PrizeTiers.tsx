import React from "react";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { Button } from "@nextui-org/react";
import Image from "next/image";
const PrizeTiers = ({
  setVisibility,
}: {
  setVisibility: (value: boolean) => void;
}) => {
  {
    /* 5 ppl: 1 ticket on winning t-shirt

10 ppl: 2 tickets on winning t-shirt

20 ppl: 3 tickets on winning t-shirtrs

50 ppl: 4 tickets on winning t-shirtat

75 ppl: 5 tickets on winning t-shirtes

1mil referrals = Guaranteed tesla with mockup */
  }
  // const prizes = [
  //   {
  //     referrals: 5,
  //     prize: 1,
  //   },
  //   {
  //     referrals: 10,
  //     prize: 2,
  //   },
  //   {
  //     referrals: 20,
  //     prize: 3,
  //   },
  //   {
  //     referrals: 50,
  //     prize: 4,
  //   },
  //   {
  //     referrals: 75,
  //     prize: 5,
  //   },
  // ];

  // const products = [
  // 	{
  // 		name: 'Hack49 T-shirt',
  // 		image: 'https://png.pngtree.com/png-clipart/20230520/ourmid/pngtree-realistic-plain-black-t-shirt-mockup-png-image_7103580.png',
  // 	},
  // 	{
  // 		name: 'Hack49 Hat',
  // 		image: 'https://static.vecteezy.com/system/resources/previews/026/860/472/original/cap-mockup-isolated-on-transparent-background-realistic-cap-hat-templates-angle-view-of-adult-caps-mockup-generative-ai-png.png',
  // 	},
  // 	{
  // 		name: 'Hack49 Water Bottle',
  // 		image: 'https://static.vecteezy.com/system/resources/previews/024/952/476/original/white-metal-water-bottle-3d-render-isolated-white-metallic-bottle-mockup-png.png',
  // 	},
  // 	{
  // 		name: 'Hack49 Stickers',
  // 		image: 'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA2L3JtMzYzLWIwNS5qcGc.jpg',
  // 	},
  // 	{
  // 		name: 'Tesla Model 3',
  // 		className: 'col-span-2 h-96',
  // 		image: 'https://www.greenncap.com/wp-content/uploads/tesla-model-3-2022-0099.png',
  // 	},
  // ];

  return (
    <div className="fixed w-screen h-screen overflow-x-hidden z-50 inset-0 justify-start fc overflow-y-scroll">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setVisibility(false)}
        className="bg-black/50 w-full h-full absolute top-0 left-0 z-0"
      />

      {/* prizes */}
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="rainbow-shadow relative w-full max-w-4xl my-10"
      >
        {/* close button */}
        <Button
          isIconOnly
          onClick={() => setVisibility(false)}
          className="absolute top-4 right-4 z-20 tex2xl"
        >
          <IoClose />
        </Button>
        <div className="fc z-10 w-full bg-neutral-900/90 relative p-10 backdrop-blur-2xl rounded-2xl">
          <div className="fc gap-10 justify-between w-full">
            <div className="fc gap-2 w-full text-center">
              <h1 className="text-4xl mb-4">Referral Prize</h1>
              <p>
                Every referral = 1 ticket. Note that you'll get a ticket once
                the person uses your referral code after their application is
                submitted.
              </p>
            </div>
            <div className="fc gap-2 w-full">
              <Image
                src="/images/TSHIRT.png"
                width={400}
                height={200}
                className="w-full max-w-[400px]"
                alt="tshirt"
              />
              <p>
                T-shirt may not be exactly as shown as we are still finalizing
                the design.
              </p>
            </div>
            {/* <div className="grid grid-cols-2 w-full h-full gap-4">
							{products.map((product, index) => (
								<div key={index} className={`size-48 w-full p-2 rounded-lg bg-neutral-300 ${product.className || 'col-span-1'}`}>
									<img className="h-full w-full object-contain" src={product.image} alt="prize" />
								</div>
							))}
						</div> */}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PrizeTiers;
