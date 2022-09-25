import { useState, useEffect, useContext } from "react";
import { formatter } from "../utils/helpers";
import ProductOptions from "./ProductOptions";
import { CartContext } from "../context/shopContext";
import axios from "axios";
import useSWR from "swr";
import payment from "../public/payments.png";
import Image from "next/image";
import {
  FaTruckMoving,
  FaStopwatch20,
  FaStar,
  FaStarHalf,
} from "react-icons/fa";
import { gsap, Expo } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);






var random = Math.floor(Math.random() * 20 + 10);
var round = Math.round(random);
// setup inventory fetcher
const fetchInventory = (url, id) =>
  axios
    .get(url, {
      params: {
        id: id,
      },
    })
    .then((res) => res.data);

export default function ProductForm({ product }) {
  const { data: productInventory } = useSWR(
    ["/api/available", product.handle],
    (url, id) => fetchInventory(url, id),
    { errorRetryCount: 3 }
  );

  const [available, setAvailable] = useState(true);

  const { addToCart } = useContext(CartContext);

  const allVariantOptions = product.variants.edges?.map((variant) => {
    const allOptions = {};

    variant.node.selectedOptions.map((item) => {
      allOptions[item.name] = item.value;
    });

    return {
      id: variant.node.id,
      title: product.title,
      handle: product.handle,
      image: variant.node.image?.originalSrc,
      options: allOptions,
      variantTitle: variant.node.title,
      variantPrice: variant.node.priceV2.amount,
      variantQuantity: 1,
    };
  });

  const defaultValues = {};
  product.options.map((item) => {
    defaultValues[item.name] = item.values[0];
  });

  const [selectedVariant, setSelectedVariant] = useState(allVariantOptions[0]);
  const [selectedOptions, setSelectedOptions] = useState(defaultValues);

  function setOptions(name, value) {
    setSelectedOptions((prevState) => {
      return { ...prevState, [name]: value };
    });

    const selection = {
      ...selectedOptions,
      [name]: value,
    };

    allVariantOptions.map((item) => {
      if (JSON.stringify(item.options) === JSON.stringify(selection)) {
        setSelectedVariant(item);
      }
    });
  }

  useEffect(() => {
    if (productInventory) {
      const checkAvailable = productInventory?.variants.edges.filter(
        (item) => item.node.id === selectedVariant.id
      );

      if (checkAvailable[0].node.availableForSale) {
        setAvailable(true);
      } else {
        setAvailable(false);
      }
    }
  }, [productInventory, selectedVariant]);

  useEffect(() => {
    if (productInventory) {
      const checkAvailable = productInventory?.variants.edges.filter(
        (item) => item.node.id === selectedVariant.id
      );

      if (checkAvailable[0].node.availableForSale) {
        setAvailable(true);
      } else {
        setAvailable(false);
      }
    }
  }, [productInventory, selectedVariant]);

  const price = product.variants.edges[0].node.priceV2.amount;
  const compare = product.variants.edges[0].node.compareAtPriceV2.amount;
  const priceSaving = compare - price;
  const saving = ((compare - price) / compare) * 100;
  const roundv2 = Math.round(saving);
  useEffect(() => {
    ScrollTrigger.create({
      trigger: ".trigger-me",
      start: "top 80%",
      end: "bottom 20%",
      onEnter: () => {
        gsap.to(".extra-add-to-cart", {
          opacity: 1,
          ease: Expo.easeOut,
        });
      },
      onLeaveBack: () => {
        gsap.to(".extra-add-to-cart", {
          opacity: 0,
          ease: Expo.easeOut,
        });
      },
    });
  
  }, []);

  return (
    <div className="rounded-2xl p-4 shadow-lg flex flex-col w-full md:w-1/3 bg-white text-black  z-40">
      {/* <div className="text-sm font-thin flex align-bottom text-green-500">
        {round} sold |
        <div className="flex align-bottom pt-1 pl-2 happy">
          <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStarHalf />
        </div>
      </div> */}
      <h2 className="text-xl font-bold uppercase">{product.title}</h2>
      <div className="flex pt-2 text-md justify-between ">
        <div> 
          <span className=" pr-5 line-through ">
            {formatter.format(
              product.variants.edges[0].node.compareAtPriceV2.amount
            )}
          </span>
          <span className="py-1 px-2 bg-black text-white">
          -%{roundv2} {formatter.format(product.variants.edges[0].node.priceV2.amount)} 
          </span>
        </div>
        <div className="text-md text-red-600">
          <span>Low in stock</span>
        </div>
      </div>
      {/* <span className="text-green-500 text-sm">
        You save {formatter.format(priceSaving)} %{roundv2}
      </span> */}
      {product.options.map(({ name, values }) => (
        <ProductOptions
          key={`key-${name}`}
          name={name}
          values={values}
          selectedOptions={selectedOptions}
          setOptions={setOptions}
          selectedVariant={selectedVariant}
          productInventory={productInventory}
          available={available}
        />
      ))}
      {available ? (
        <button
          onClick={() => {
            addToCart(selectedVariant);
          }}
          className="flex w-full rounded-md bg-green-500 mt-2  justify-center  py-5   z-50    text-white  hover:text-white hover:bg-green-800"
        >
          Add To Card
        </button>
      ) : (
        <button className="rounded-lg text-white px-2 py-3 mt-3 bg-gray-800 cursor-not-allowed">
          Sold out!
        </button>
      )}
      <div className="extra-add-to-cart opacity-0">
      {available ? (
        <button
          onClick={() => {
            addToCart(selectedVariant);
          }}
          className="flex font-sm px-1 py-1 bg-green-500 w-full fixed bottom-0 right-0 justify-center sm:bottom-4 sm:w-1/6 sm:text-center  sm:rounded-lg z-50 text-white sm:px-2 sm:py-3 sm:mt-3 hover:text-white hover:bg-green-600"
        >
          Add To Card
        </button>
      ) : (
        <button className="rounded-lg text-white px-2 py-3 mt-3 bg-gray-800 cursor-not-allowed">
          Sold out!
        </button>
      )}
      </div>
      <div className="max-h-94 max-w-94 py-2">
        <Image
          src={payment}
          alt="payment methods"
          height={100}
          weidth={10}
          quality={100}
        />
      </div>
      <div>
      <div className="flex py-2">
        <FaStopwatch20 size="2.5rem" />
        <span className="pl-2 trigger-me">
          Selling fast! Only 8 left, and over 20 people have it in their carts.
        </span>
      </div>
      <div className="flex py-2">
        <FaTruckMoving size="1.5rem" />
        <span className="pl-2">Hooray! This item ships free to the US.</span>
      </div>
      </div>
    </div>
  );
}
