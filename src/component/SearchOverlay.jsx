import React, { useEffect, useMemo, useRef, useState } from 'react'

const perfumes = [
  { brand: 'CREED', name: 'Aventus', price: '₹24,900', image: 'photo-1594035910387-fea47794261f', tone: 'from-neutral-200' },
  { brand: 'CREED', name: 'Aventus for Her', price: '₹22,500', image: 'photo-1541643600914-78b084683601', tone: 'from-amber-50' },
  { brand: 'CREED', name: 'Aventus Cologne', price: '₹19,900', image: 'photo-1592945403244-b3fbafd7f539', tone: 'from-slate-100' },
  { brand: 'XERJOFF', name: 'Alexandria II', price: '₹28,500', image: 'photo-1595425970377-c9703cf48b6d', tone: 'from-sky-100' },
  { brand: 'BY KILIAN', name: 'Voulez-Vous', price: '₹21,000', image: 'photo-1590736969955-71cc94901144', tone: 'from-stone-100' },
  { brand: 'FRENCH AVENUE', name: 'Liquid Brun', price: '₹3,499', image: 'photo-1595425970377-c9703cf48b6d', tone: 'from-orange-100' },
  { brand: 'FRENCH AVENUE', name: 'Liquid Brun Limited Edition', price: '₹3,999', image: 'photo-1590736969955-71cc94901144', tone: 'from-orange-50' },
  { brand: 'PARFUMS DE MARLY', name: 'Layton', price: '₹27,500', image: 'photo-1594035910387-fea47794261f', tone: 'from-indigo-100' },
  { brand: 'AMOUAGE', name: 'Reflection Man', price: '₹31,000', image: 'photo-1541643600914-78b084683601', tone: 'from-stone-100' },
  { brand: 'CLIVE CHRISTIAN', name: 'No. 1 Clive Christian for men', price: '₹45,000', image: 'photo-1592945403244-b3fbafd7f539', tone: 'from-yellow-50' },
]

const tabs = [
  { label: 'Perfumes', count: '24' },
  { label: 'Brands', count: '11' },
  { label: 'Collections' },
  { label: 'Notes' },
]

function SearchIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="10.8" cy="10.8" r="6.3"/><path d="m15.5 15.5 4.2 4.2"/></svg>
}

export default function SearchOverlay({ onClose }) {
  const [query, setQuery] = useState('')
  const [isClosing, setIsClosing] = useState(false)
  const [tab, setTab] = useState('Perfumes')
  const [brandSearch, setBrandSearch] = useState('')
  const [openFilters, setOpenFilters] = useState({ gender: true, brand: true })
  const [selected, setSelected] = useState([])
  const closeTimer = useRef(null)

  const closeSearch = () => {
    if (isClosing) return
    setIsClosing(true)
    closeTimer.current = window.setTimeout(onClose, 230)
  }

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      window.clearTimeout(closeTimer.current)
    }
  }, [])

  useEffect(() => {
    const onKeyDown = (event) => event.key === 'Escape' && closeSearch()
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isClosing])

  const visiblePerfumes = useMemo(() => {
    const text = query.trim().toLowerCase()
    return perfumes.filter((product) => !text || `${product.brand} ${product.name}`.toLowerCase().includes(text))
  }, [query])

  const toggleSelected = (value) => setSelected((current) => current.includes(value) ? current.filter((item) => item !== value) : [...current, value])

  return <>
    <button aria-label="Close search" onClick={closeSearch} className={`search-overlay-backdrop fixed inset-0 z-[60] cursor-default bg-black/25 backdrop-blur-[5px] ${isClosing ? 'is-closing' : ''}`} />
    <section role="dialog" aria-modal="true" aria-label="Search ELSE fragrances" className={`search-overlay-panel fixed inset-x-0 top-0 z-[61] flex max-h-[92vh] flex-col overflow-hidden rounded-b-[28px] border-t-[5px] border-[#373737] bg-white px-4 pb-0 pt-6 text-[#202020] shadow-[0_22px_55px_rgba(0,0,0,.22)] sm:px-8 sm:pt-7 ${isClosing ? 'is-closing' : ''}`}>
      <form onSubmit={(event) => event.preventDefault()} className="mx-auto flex w-full max-w-[1100px] items-center gap-3">
        <label className="flex h-[50px] min-w-0 flex-1 items-center gap-3 rounded-full border border-[#888] px-4 shadow-[inset_0_0_0_2px_#eee,0_0_0_2px_#d7d7d7] sm:h-[48px]">
          <SearchIcon />
          <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search perfumes, brands, notes..." className="h-full min-w-0 flex-1 bg-transparent text-[14px] outline-none placeholder:text-[#777]" />
          {query && <button type="button" aria-label="Clear search" onClick={() => setQuery('')} className="px-1 text-xl leading-none text-[#777]">×</button>}
        </label>
        <button type="button" onClick={closeSearch} aria-label="Close search" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f3f3f3] text-[22px] text-[#555]">↑</button>
      </form>

      <div className="mx-auto mt-3 flex w-full max-w-[1100px] gap-1 overflow-x-auto border-b border-[#e5e5e5] [scrollbar-width:none]">
        {tabs.map((item) => <button key={item.label} onClick={() => setTab(item.label)} className={`flex shrink-0 items-center gap-2 rounded-t-lg px-4 py-3 text-[12px] ${tab === item.label ? 'border-b-2 border-[#222] bg-[#f7f7f7] font-medium' : 'text-[#555]'}`}>
          {item.label}{item.count && <span className={`rounded-full px-[7px] py-[3px] text-[10px] ${tab === item.label ? 'bg-[#222] text-white' : 'bg-[#eee] text-[#555]'}`}>{item.count}</span>}
        </button>)}
      </div>

      <div className="mx-auto grid w-full max-w-[1100px] flex-1 grid-cols-1 overflow-hidden md:grid-cols-[250px_minmax(0,1fr)]">
        <aside className="hidden overflow-y-auto border-r border-[#e6e6e6] pr-5 pt-4 md:block">
          <h2 className="border-b border-[#e5e5e5] pb-2 text-[14px]">Filters</h2>
          <div className="border-b border-[#e5e5e5] py-4">
            <button className="flex w-full justify-between text-left text-[14px]" onClick={() => setOpenFilters({ ...openFilters, gender: !openFilters.gender })}>Gender <span>{openFilters.gender ? '⌃' : '⌄'}</span></button>
            {openFilters.gender && <div className="mt-3 space-y-2 text-[12px] text-[#555]">{[['For Him','134'],['For Her','22'],['Unisex','87']].map(([label,count]) => <label key={label} className="flex cursor-pointer items-center gap-2"><input type="checkbox" checked={selected.includes(label)} onChange={() => toggleSelected(label)} className="h-4 w-4 accent-[#222]"/><span className="flex-1">{label}</span><span>{count}</span></label>)}</div>}
          </div>
          <div className="py-4">
            <button className="flex w-full justify-between text-left text-[14px]" onClick={() => setOpenFilters({ ...openFilters, brand: !openFilters.brand })}>Brand <span>{openFilters.brand ? '⌃' : '⌄'}</span></button>
            {openFilters.brand && <><input value={brandSearch} onChange={(event) => setBrandSearch(event.target.value)} placeholder="Search brands..." className="mt-3 h-10 w-full rounded-xl border border-[#e1e1e1] px-3 text-[12px] outline-none focus:border-[#888]"/><div className="mt-3 space-y-2 text-[12px] text-[#555]">{['Xerjoff','Creed','Amouage','By Kilian','Nishane'].filter((brand) => brand.toLowerCase().includes(brandSearch.toLowerCase())).map((brand, index) => <label key={brand} className="flex cursor-pointer items-center gap-2"><input type="checkbox" checked={selected.includes(brand)} onChange={() => toggleSelected(brand)} className="h-4 w-4 accent-[#222]"/><span className="flex-1">{brand}</span><span>{19-index*3}</span></label>)}</div></>}
          </div>
        </aside>

        <div className="overflow-y-auto py-4 md:pl-5">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {visiblePerfumes.map((product, index) => <article key={`${product.name}-${index}`} className="group relative overflow-hidden rounded-lg border border-[#e6e6e6] bg-white text-center">
              <div className={`relative h-[145px] overflow-hidden bg-gradient-to-b ${product.tone} to-white sm:h-[160px]`}>
                <img src={`https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=360&q=75`} alt={`${product.brand} ${product.name}`} className="h-full w-full object-cover mix-blend-multiply transition-transform duration-300 group-hover:scale-105" loading="lazy"/>
                {index % 3 === 0 && <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-1 text-[9px]">↗ Bestseller</span>}
              </div>
              <div className="px-2 pb-3 pt-2"><p className="text-[9px] tracking-wide text-[#777]">{product.brand}</p><h3 className="mt-1 min-h-[32px] text-[12px] font-medium leading-4">{product.name}</h3><p className="mt-1 text-[11px] font-semibold">{product.price}</p><p className="mt-1 text-[13px] tracking-[2px] text-[#fa641b]">★★★★★</p></div>
            </article>)}
          </div>
          {visiblePerfumes.length === 0 && <p className="py-12 text-center text-sm text-[#777]">No matches yet. Try another fragrance or brand.</p>}
        </div>
      </div>
    </section>
  </>
}
