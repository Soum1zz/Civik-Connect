import { useEffect, useMemo, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
  FaSeedling,
  FaUsers,
} from "react-icons/fa";
import ngoPublic from "../../assets/ngo-public.png";
import { getAllNgos, searchNgos } from "../../api/ngoApi";
import NgoPublicCard from "../../components/ngo/ngoPublicCard";
import "../../styles/NgoPublic.css";


const pageSize = 8;

function getUserValue(ngo, key) {
  return ngo?.user?.[key] || ngo?.[key] || "";
}

function getNgoName(ngo) {
  return ngo?.name || getUserValue(ngo, "username") || getUserValue(ngo, "name") || "Unnamed NGO";
}

function normalizeNgo(ngo, index) {
  const state = ngo?.State || ngo?.state || "";
  const address = ngo?.address || "";
  const location = [address, state].filter(Boolean).join(", ") || "Location unavailable";

  return {
    ngoId: ngo?.ngoId || `ngo-${index}`,
    name: getNgoName(ngo),
    description: ngo?.description || "This NGO has not added a public description yet.",
    location,
    state: state || "Not selected",
    isVerified: Boolean(ngo?.isVerified ?? ngo?.verified),
  };
}

export default function NgoPublic() {
  const [ngos, setNgos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("All Locations");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadNgos() {
      try {
        const res = await getAllNgos();
        const data = Array.isArray(res.data) ? res.data.map(normalizeNgo) : [];
        if (isMounted) {
          setNgos(data);
          setError("");
        }
      } catch (e) {
        console.log(e);
        if (isMounted) {
          setError("Trying to fetch ngos...");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadNgos();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const query = searchTerm.trim();
    if (!query) return;

    const timeoutId = window.setTimeout(async () => {
      try {
        const res = await searchNgos(query);
        if (Array.isArray(res.data)) {
          setNgos(res.data.map(normalizeNgo));
          setError("");
        }
      } catch (e) {
        console.log(e);
      }
    }, 350);

    return () => window.clearTimeout(timeoutId);
  }, [searchTerm]);

  const locations = useMemo(() => {
    const states = ngos.map((ngo) => ngo.state).filter(Boolean);
    return ["All Locations", ...Array.from(new Set(states)).sort()];
  }, [ngos]);

  const filteredNgos = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    const nextNgos = ngos.filter((ngo) => {
      const matchesSearch =
        !query ||
        ngo.name.toLowerCase().includes(query) ||
        ngo.description.toLowerCase().includes(query) ||
        ngo.location.toLowerCase().includes(query);
      const matchesLocation = locationFilter === "All Locations" || ngo.state === locationFilter;

      return matchesSearch && matchesLocation;
    });

    return [...nextNgos].sort((a, b) => {
      if (sortBy === "oldest") return Number(a.founded) - Number(b.founded);
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return Number(b.founded) - Number(a.founded);
    });
  }, [ngos, searchTerm, locationFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredNgos.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visibleNgos = filteredNgos.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <main className="ngo-public-page">
      <section className="ngo-public-hero">
        <div>
          <h1>NGO Directory</h1>
          <p>Discover and connect with NGOs working for a better tomorrow.</p>
        </div>
        <div className="ngo-public-hero-art" aria-hidden="true">
          <img src={ngoPublic} alt="" />
        </div>
      </section>

      <section className="ngo-public-toolbar" aria-label="NGO directory controls">
        <label className="ngo-public-search">
          <FaSearch />
          <input
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
              setPage(1);
            }}
            placeholder="Search NGOs by name, keyword or location..."
          />
        </label>

        <div className="ngo-public-selects">
          <select
            value={locationFilter}
            onChange={(event) => {
              setLocationFilter(event.target.value);
              setPage(1);
            }}
          >
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>


        </div>
      </section>

      {error && <p className="ngo-public-note">{error}</p>}

      {loading ? (
        <section className="ngo-public-state">
          <FaSeedling />
          <span>Loading NGOs...</span>
        </section>
      ) : visibleNgos.length ? (
        <section className="ngo-public-grid">
          {visibleNgos.map((ngo) => (
            <NgoPublicCard key={ngo.ngoId} ngo={ngo} />
          ))}
        </section>
      ) : (
        <section className="ngo-public-state">
          <FaUsers />
          <strong>No NGOs found</strong>
          <span>Try a different search or location.</span>
        </section>
      )}

      {filteredNgos.length > pageSize && (
        <nav className="ngo-public-pagination" aria-label="NGO pages">
          <button
            type="button"
            aria-label="Previous page"
            disabled={currentPage === 1}
            onClick={() => setPage((value) => Math.max(1, value - 1))}
          >
            <FaChevronLeft />
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <button
              type="button"
              key={pageNumber}
              className={pageNumber === currentPage ? "active" : ""}
              onClick={() => setPage(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
          <button
            type="button"
            aria-label="Next page"
            disabled={currentPage === totalPages}
            onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
          >
            <FaChevronRight />
          </button>
        </nav>
      )}
    </main>
  );
}
