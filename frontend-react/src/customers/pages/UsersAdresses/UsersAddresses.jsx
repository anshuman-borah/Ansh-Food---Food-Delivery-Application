import React from "react";
import AddressCard from "../../components/Address/AddressCard";
import { useSelector } from "react-redux";

const UsersAddresses = () => {
  const { auth } = useSelector((state) => state);

  // Deduplication helper to filter out identical duplicate addresses on frontend UI
  const getUniqueAddresses = (addresses) => {
    if (!addresses) return [];
    const unique = [];
    const seen = new Set();
    for (const addr of addresses) {
      const key = `${addr.streetAddress?.trim().toLowerCase()}-${addr.city?.trim().toLowerCase()}-${addr.state?.trim().toLowerCase()}-${(addr.postalCode || addr.pincode)?.trim()}`;
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(addr);
      }
    }
    return unique;
  };

  return (
    <div>
      <div className="flex items-center flex-col lg:px-10">
        <h1 className="text-xl text-center py-7 font-semibold">Addresses</h1>
        <div className="flex justify-center flex-wrap gap-3">
          {getUniqueAddresses(auth.user?.addresses).map((item, index) => (
            <AddressCard key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersAddresses;