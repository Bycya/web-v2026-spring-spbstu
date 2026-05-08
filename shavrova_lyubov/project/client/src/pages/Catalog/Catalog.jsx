import { useState, useEffect, useMemo } from "react";
import api from "../../api/api";
import Filters from "../../components/Filters/Filters";
import SortTabs from "../../components/SortTabs/SortTabs";
import ProductCard from "../../components/ProductCard/ProductCard";
import Pagination from "../../components/Pagination/Pagination";
import ProductModal from "../../components/ProductModal/ProductModal";
import styles from "./Catalog.module.css";

const PAGE_SIZE = 9;
export const PRICE_MIN = 0;
export const PRICE_MAX = 100000;
const DEFAULT_FILTERS = { priceFrom: PRICE_MIN, priceTo: PRICE_MAX, categories: [], colors: [] };

function Catalog() {
  const [goods, setGoods] = useState([]);
  const [sort, setSort] = useState("new");
  const [appliedFilters, setAppliedFilters] = useState(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    api.get("/goods").then((r) => setGoods(r.data)).catch(() => {});
  }, []);

  const filtered = useMemo(() => {
    let list = [...goods];
    const { priceFrom, priceTo, categories, colors } = appliedFilters;
    list = list.filter((g) => g.price >= priceFrom && g.price <= priceTo);
    if (categories.length > 0) list = list.filter((g) => categories.includes(g.category));
    if (colors.length > 0) list = list.filter((g) => colors.includes(g.color));
    return list;
  }, [goods, appliedFilters]);

  const sorted = useMemo(() => {
    const list = [...filtered];
    if (sort === "new") return list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0) || b.id - a.id);
    if (sort === "popular") return list.sort((a, b) => b.rating - a.rating);
    if (sort === "cheap") return list.sort((a, b) => a.price - b.price);
    if (sort === "expensive") return list.sort((a, b) => b.price - a.price);
    return list;
  }, [filtered, sort]);

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleFilterApply = (filters) => {
    setAppliedFilters(filters);
    setPage(1);
  };

  const handleFilterReset = () => {
    setAppliedFilters(DEFAULT_FILTERS);
    setPage(1);
  };

  const handleSortChange = (s) => {
    setSort(s);
    setPage(1);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <Filters onApply={handleFilterApply} onReset={handleFilterReset} />
        </aside>
        <div className={styles.main}>
          <div className={styles.topBar}>
            <h1 className={styles.title}>Каталог</h1>
            <SortTabs value={sort} onChange={handleSortChange} />
          </div>
          {paginated.length === 0 ? (
            <div className={styles.empty}>
              <p>Товары не найдены</p>
            </div>
          ) : (
            <div className={styles.grid}>
              {paginated.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpenModal={setSelectedProduct}
                />
              ))}
            </div>
          )}
          <Pagination current={page} total={totalPages} onChange={setPage} />
        </div>
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}

export default Catalog;
