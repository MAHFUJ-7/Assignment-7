import React from 'react'
import { notFound } from 'next/navigation';
import ProductList from './ProductList';

const fetchCategory = async (category) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products?category=${encodeURIComponent(category)}`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) {
    return [];
  }
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}


const cateGoryWise = async ({ params }) => {
  const { id } = await params;
  const categoryData = await fetchCategory(id);
  if (categoryData.length === 0) {
    notFound();
  }

  return (
    <div>
      <div className="flex gap-4 items-center m-3 p-4 bg-[#f0f0f0] rounded-[10px]">
        <h1 className="text-5xl font-bold">{categoryData[0].categoryIcon}</h1>
        <div>
          <h1 className="text-2xl font-bold">{categoryData[0].categoryNameBn}</h1>
          <h3><span>{categoryData.length.toLocaleString("bn-BD")}</span>টি পণ্যের আজকের দাম ও পরিবর্তন</h3>
        </div>
      </div>

      <ProductList products={categoryData} />
    </div>
  )
}

export default cateGoryWise