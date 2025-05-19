"use client";
import CheckoutCard from "../components/Cards/CheckoutCard";
import Table from "../components/Table";

export default function ShoppingCartPage() {
  return (
    <section className="flex flex-wrap gap-10 mx-25 my-24 justify-center items-center">
      <Table />
      <CheckoutCard />
    </section>
  );
}
