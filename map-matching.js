// =============================
// map-matching.js
// =============================

(function() {

    // Haversine distance → km
    function distance(lat1, lon1, lat2, lon2) {
      const R = 6371;
      const dLat = (lat2 - lat1) * Math.PI/180;
      const dLon = (lon2 - lon1) * Math.PI/180;
  
      const a =
        Math.sin(dLat/2)**2 +
        Math.cos(lat1*Math.PI/180) *
        Math.cos(lat2*Math.PI/180) *
        Math.sin(dLon/2)**2;
  
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      return R * c;
    }
  
    // Precompute cumulative distances for ROUTE
    let cumulativeDistance = [];
  
    function computeRouteDistances() {
      cumulativeDistance = [0];
      for (let i = 1; i < window.ROUTE.length; i++) {
        const prev = window.ROUTE[i-1];
        const curr = window.ROUTE[i];
        const d = distance(prev.lat, prev.lon, curr.lat, curr.lon);
        cumulativeDistance.push(cumulativeDistance[i-1] + d);
      }
    }
  
    // Find nearest point index to GPS
    function findClosestPoint(lat, lon) {
      let bestIndex = 0;
      let bestDist = Infinity;
      for (let i = 0; i < window.ROUTE.length; i++) {
        const p = window.ROUTE[i];
        const d = distance(lat, lon, p.lat, p.lon);
        if (d < bestDist) {
          bestDist = d;
          bestIndex = i;
        }
      }
      return bestIndex;
    }
  
    // Get traveled km from GPS
    function getTraveledKM(lat, lon) {
      const idx = findClosestPoint(lat, lon);
      return cumulativeDistance[idx];
    }
  
    // Tìm block theo km đã đi (best practice: so sánh traveled_km với km_start, km_end)
    function getCurrentBlock(traveledKm) {
      var blocks = window.BLOCKS;
      if (!blocks || !blocks.length) return null;
      if (traveledKm == null || typeof traveledKm !== "number") return blocks[0];
      if (traveledKm < blocks[0].km_start) return blocks[0];
      for (var i = blocks.length - 1; i >= 0; i--) {
        if (traveledKm >= blocks[i].km_start) return blocks[i];
      }
      return blocks[blocks.length - 1];
    }

    // Trả về { start_km, end_km } của block để hiển thị (từ block.km_start, block.km_end)
    function getBlockKmRange(block) {
      if (!block || typeof block.km_start !== "number" || typeof block.km_end !== "number") return null;
      return { start_km: block.km_start, end_km: block.km_end };
    }

    // Expose globally
    window.MapMatcher = {
      distance,
      computeRouteDistances,
      findClosestPoint,
      getTraveledKM,
      getCurrentBlock,
      getBlockKmRange
    };
  
    // ROUTE được set từ geojson.json tại runtime; gọi computeRouteDistances() sau khi có ROUTE
    if (window.ROUTE && window.ROUTE.length) computeRouteDistances();
  })();