"use client";
import { motion } from "framer-motion";

export function ProductCardSkeleton() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-md h-full flex flex-col min-h-[520px] w-full animate-pulse">
      <div className="relative h-64 w-full bg-gray-200 rounded-2xl mb-4" />
      <div className="h-6 bg-gray-200 rounded mb-2 w-3/4" />
      <div className="h-4 bg-gray-200 rounded mb-4 w-full" />
      <div className="h-8 bg-gray-200 rounded mb-4 w-1/2" />
      <div className="flex gap-2 mb-4">
        <div className="h-8 w-8 bg-gray-200 rounded-full" />
        <div className="h-8 w-8 bg-gray-200 rounded-full" />
        <div className="h-8 w-8 bg-gray-200 rounded-full" />
      </div>
      <div className="mt-auto flex gap-3 pt-4">
        <div className="h-11 bg-gray-200 rounded-xl flex-1" />
        <div className="h-11 bg-gray-200 rounded-xl flex-1" />
      </div>
    </div>
  );
}

export function CheckoutSkeleton() {
  return (
    <div className="bg-[#FAF8F5] py-24 min-h-screen">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-8 shadow-lg animate-pulse h-[600px]">
            <div className="h-8 bg-gray-200 rounded mb-6 w-1/3" />
            <div className="space-y-4">
              <div className="h-12 bg-gray-200 rounded" />
              <div className="h-12 bg-gray-200 rounded" />
              <div className="h-12 bg-gray-200 rounded" />
              <div className="h-12 bg-gray-200 rounded" />
              <div className="h-12 bg-gray-200 rounded" />
            </div>
          </div>
          <div className="rounded-3xl bg-white p-8 shadow-lg animate-pulse h-[400px]">
            <div className="h-8 bg-gray-200 rounded mb-6 w-1/2" />
            <div className="space-y-4">
              <div className="h-20 bg-gray-200 rounded" />
              <div className="h-20 bg-gray-200 rounded" />
            </div>
            <div className="mt-8 h-12 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

