import { useEffect, useState } from "react";
import Link from "next/link";

const Pagination = ({ max, current }) => {
  const [indices, setIndices] = useState([]);

  useEffect(() => {
    const startIndex = current - 2 <= 0 ? 1 : current - 2;
    const endIndex = current + 2;
    let tempIndices = [];
    if (max < 5) {
      for (let i = 1; i <= max; i++) {
        setIndices(tempIndices.push(i));
      }
    } else if (current > 2 && max - current >= 2) {
      for (let i = startIndex; i <= endIndex; i++) {
        setIndices(tempIndices.push(i));
      }
    } else if (current <= 2 && max - current >= 2) {
      for (let i = 1; i <= 5; i++) {
        setIndices(tempIndices.push(i));
      }
    } else if (max - current == 1) {
      for (let i = startIndex; i <= max; i++) {
        setIndices(tempIndices.push(i));
      }
      tempIndices = [tempIndices[0] - 1].concat(tempIndices);
    } else {
      for (let i = startIndex; i <= max; i++) {
        setIndices(tempIndices.push(i));
      }
      tempIndices = [tempIndices[0] - 2, tempIndices[0] - 1].concat(
        tempIndices
      );
    }
    setIndices(tempIndices);
  }, [current]);

  return (
    <div className="flex">
      {current != 1 ? (
        <Link href={`/listing?page=${current - 1}`}>
          <div className="cursor-pointer border w-10 h-10 text-center items-center flex justify-center bg-gray-100">
            {"<"}
          </div>
        </Link>
      ) : null}
      {indices.map((index, i) => {
        return (
          <Link href={`/listing?page=${index}`}>
            <div
              className={`cursor-pointer border w-10 h-10 text-center items-center flex justify-center ${
                current == index ? "bg-gray-900 text-white" : "bg-gray-100"
              }`}
              key={index}
            >
              {index}
            </div>
          </Link>
        );
      })}
      {current != max ? (
        <Link href={`/listing?page=${current + 1}`}>
          <div className="cursor-pointer border w-10 h-10 text-center items-center flex justify-center bg-gray-100">
            {">"}
          </div>
        </Link>
      ) : null}
    </div>
  );
};

export default Pagination;
