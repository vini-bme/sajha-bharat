import { useMutation, useQuery } from "@tanstack/react-query";

export type ParsedRequirement = {
  product: string;
  quantity: number;
  category: string;
  location: string;
  deadlineDays: number;
  budgetPerUnit: number;
  womenLedPreference: boolean;
};

export type Producer = {
  id: string;
  name: string;
};

export type ProducerCluster = {
  id: string;
  name: string;
  district: string;
  state: string;
  distanceKm: number;
  capacity: number;
  qualityScore: number;
  onTimeRate: number;
  womenLed: boolean;
  categories: string[];
  products: string[];
  producers: Producer[];
};

export type Allocation = {
  cluster: ProducerCluster;
  units: number;
  percentage: number;
  rationale: string;
};

export type MatchingResult = {
  feasible: boolean;
  pooledCapacity: number;
  requiredUnits: number;
  projectedOrderValue: number;
  estimatedCompletionDays: number;
  producersInvolved: number;
  capacityUtilization: number;
  parsedRequirement: ParsedRequirement;
  allocations: Allocation[];
};

const clusters: ProducerCluster[] = [
  {
    id: "up-lucknow-01",
    name: "Awadh Stitch Collective",
    district: "Lucknow",
    state: "Uttar Pradesh",
    distanceKm: 18,
    capacity: 420,
    qualityScore: 94,
    onTimeRate: 96,
    womenLed: true,
    categories: ["bags", "textiles", "school supplies"],
    products: ["cotton school bags", "cloth bags", "uniform bags"],
    producers: [
      { id: "p01", name: "Awadh Stitch Unit A" },
      { id: "p02", name: "Awadh Stitch Unit B" },
      { id: "p03", name: "Awadh Stitch Unit C" },
    ],
  },
  {
    id: "up-barabanki-01",
    name: "Barabanki Women Makers",
    district: "Barabanki",
    state: "Uttar Pradesh",
    distanceKm: 32,
    capacity: 380,
    qualityScore: 92,
    onTimeRate: 94,
    womenLed: true,
    categories: ["bags", "textiles", "handicrafts"],
    products: ["cotton school bags", "jute bags", "cloth organisers"],
    producers: [
      { id: "p04", name: "Barabanki Makers A" },
      { id: "p05", name: "Barabanki Makers B" },
    ],
  },
  {
    id: "up-kanpur-01",
    name: "Kanpur Textile Network",
    district: "Kanpur Nagar",
    state: "Uttar Pradesh",
    distanceKm: 82,
    capacity: 520,
    qualityScore: 90,
    onTimeRate: 91,
    womenLed: false,
    categories: ["bags", "textiles", "uniforms"],
    products: ["cotton bags", "school bags", "fabric products"],
    producers: [
      { id: "p06", name: "Kanpur Textile A" },
      { id: "p07", name: "Kanpur Textile B" },
      { id: "p08", name: "Kanpur Textile C" },
    ],
  },
  {
    id: "up-unnao-01",
    name: "Unnao Artisan Cluster",
    district: "Unnao",
    state: "Uttar Pradesh",
    distanceKm: 58,
    capacity: 290,
    qualityScore: 88,
    onTimeRate: 89,
    womenLed: true,
    categories: ["bags", "handicrafts", "textiles"],
    products: ["cloth bags", "handmade bags", "cotton accessories"],
    producers: [
      { id: "p09", name: "Unnao Artisan A" },
      { id: "p10", name: "Unnao Artisan B" },
    ],
  },
  {
    id: "up-sitapur-01",
    name: "Sitapur Rural Producers",
    district: "Sitapur",
    state: "Uttar Pradesh",
    distanceKm: 92,
    capacity: 340,
    qualityScore: 86,
    onTimeRate: 88,
    womenLed: true,
    categories: ["bags", "textiles"],
    products: ["cotton bags", "school accessories"],
    producers: [
      { id: "p11", name: "Sitapur Producers A" },
      { id: "p12", name: "Sitapur Producers B" },
    ],
  },
  {
    id: "up-raebareli-01",
    name: "Rae Bareli Craft Network",
    district: "Rae Bareli",
    state: "Uttar Pradesh",
    distanceKm: 78,
    capacity: 260,
    qualityScore: 84,
    onTimeRate: 87,
    womenLed: false,
    categories: ["bags", "handicrafts"],
    products: ["cloth bags", "jute products"],
    producers: [
      { id: "p13", name: "Rae Bareli Craft A" },
      { id: "p14", name: "Rae Bareli Craft B" },
    ],
  },
  {
    id: "up-ayodhya-01",
    name: "Saryu Women Enterprise",
    district: "Ayodhya",
    state: "Uttar Pradesh",
    distanceKm: 130,
    capacity: 310,
    qualityScore: 91,
    onTimeRate: 93,
    womenLed: true,
    categories: ["bags", "textiles", "handicrafts"],
    products: ["cotton bags", "school bags", "fabric products"],
    producers: [
      { id: "p15", name: "Saryu Enterprise A" },
      { id: "p16", name: "Saryu Enterprise B" },
    ],
  },
  {
    id: "up-prayagraj-01",
    name: "Prayagraj Production Collective",
    district: "Prayagraj",
    state: "Uttar Pradesh",
    distanceKm: 190,
    capacity: 450,
    qualityScore: 89,
    onTimeRate: 90,
    womenLed: false,
    categories: ["bags", "textiles"],
    products: ["school bags", "cotton bags", "uniform accessories"],
    producers: [
      { id: "p17", name: "Prayagraj Collective A" },
      { id: "p18", name: "Prayagraj Collective B" },
    ],
  },
  {
    id: "up-varanasi-01",
    name: "Kashi Artisan Network",
    district: "Varanasi",
    state: "Uttar Pradesh",
    distanceKm: 285,
    capacity: 360,
    qualityScore: 93,
    onTimeRate: 92,
    womenLed: true,
    categories: ["bags", "textiles", "handicrafts"],
    products: ["cotton bags", "handmade bags", "fabric products"],
    producers: [
      { id: "p19", name: "Kashi Artisan A" },
      { id: "p20", name: "Kashi Artisan B" },
    ],
  },
  {
    id: "up-hardoi-01",
    name: "Hardoi Rural Makers",
    district: "Hardoi",
    state: "Uttar Pradesh",
    distanceKm: 105,
    capacity: 230,
    qualityScore: 82,
    onTimeRate: 85,
    womenLed: true,
    categories: ["bags", "textiles"],
    products: ["cloth bags", "cotton products"],
    producers: [
      { id: "p21", name: "Hardoi Makers A" },
      { id: "p22", name: "Hardoi Makers B" },
    ],
  },
  {
    id: "up-amethi-01",
    name: "Amethi Women Producers",
    district: "Amethi",
    state: "Uttar Pradesh",
    distanceKm: 125,
    capacity: 275,
    qualityScore: 87,
    onTimeRate: 90,
    womenLed: true,
    categories: ["bags", "handicrafts", "textiles"],
    products: ["cotton bags", "school bags", "handmade products"],
    producers: [
      { id: "p23", name: "Amethi Producers A" },
      { id: "p24", name: "Amethi Producers B" },
    ],
  },
  {
    id: "up-sultanpur-01",
    name: "Sultanpur Maker Collective",
    district: "Sultanpur",
    state: "Uttar Pradesh",
    distanceKm: 150,
    capacity: 250,
    qualityScore: 85,
    onTimeRate: 88,
    womenLed: false,
    categories: ["bags", "textiles"],
    products: ["cotton bags", "school accessories"],
    producers: [
      { id: "p25", name: "Sultanpur Collective A" },
      { id: "p26", name: "Sultanpur Collective B" },
    ],
  },
];

function normalise(value: string) {
  return value.toLowerCase().trim();
}

function locationMatch(cluster: ProducerCluster, location: string) {
  const target = normalise(location);

  if (!target) return 0;

  if (
    normalise(cluster.district).includes(target) ||
    target.includes(normalise(cluster.district))
  ) {
    return 1;
  }

  if (
    normalise(cluster.state).includes(target) ||
    target.includes(normalise(cluster.state))
  ) {
    return 0.8;
  }

  return 0.35;
}

function productMatch(cluster: ProducerCluster, requirement: ParsedRequirement) {
  const product = normalise(requirement.product);
  const category = normalise(requirement.category);

  if (
    cluster.products.some(
      (item) =>
        product.includes(normalise(item)) ||
        normalise(item).includes(product),
    )
  ) {
    return 1;
  }

  if (
    category &&
    cluster.categories.some(
      (item) =>
        normalise(item).includes(category) ||
        category.includes(normalise(item)),
    )
  ) {
    return 0.85;
  }

  if (
    product.includes("bag") &&
    cluster.categories.includes("bags")
  ) {
    return 0.75;
  }

  return 0.25;
}

function scoreCluster(
  cluster: ProducerCluster,
  requirement: ParsedRequirement,
) {
  const productFit = productMatch(cluster, requirement);
  const locationFit = locationMatch(cluster, requirement.location);
  const reliability = (cluster.qualityScore + cluster.onTimeRate) / 200;

  const womenBonus = requirement.womenLedPreference && cluster.womenLed
    ? 0.08
    : 0;

  const capacityFit =
    cluster.capacity >= requirement.quantity
      ? 1
      : Math.min(cluster.capacity / Math.max(requirement.quantity, 1), 1);

  return (
    productFit * 0.42 +
    locationFit * 0.18 +
    reliability * 0.22 +
    capacityFit * 0.10 +
    womenBonus
  );
}

function buildRationale(
  cluster: ProducerCluster,
  requirement: ParsedRequirement,
) {
  const reasons: string[] = [];

  if (productMatch(cluster, requirement) >= 0.75) {
    reasons.push("strong product/category fit");
  }

  if (locationMatch(cluster, requirement.location) >= 0.8) {
    reasons.push(`close to ${requirement.location}`);
  }

  if (cluster.onTimeRate >= 92) {
    reasons.push(`${cluster.onTimeRate}% on-time fulfillment`);
  }

  if (cluster.qualityScore >= 90) {
    reasons.push(`quality score ${cluster.qualityScore}`);
  }

  if (requirement.womenLedPreference && cluster.womenLed) {
    reasons.push("women-led cluster preference");
  }

  if (reasons.length === 0) {
    reasons.push("available capacity and relevant production capability");
  }

  return `Selected because of ${reasons.join(", ")}.`;
}

function createPlan(requirement: ParsedRequirement): MatchingResult {
  const ranked = [...clusters]
    .map((cluster) => ({
      cluster,
      score: scoreCluster(cluster, requirement),
    }))
    .filter(({ score }) => score >= 0.38)
    .sort((a, b) => b.score - a.score);

  let remaining = requirement.quantity;
  const allocations: Allocation[] = [];

  for (const { cluster } of ranked) {
    if (remaining <= 0 || allocations.length >= 5) break;

    const units = Math.min(cluster.capacity, remaining);

    if (units <= 0) continue;

    allocations.push({
      cluster,
      units,
      percentage: 0,
      rationale: buildRationale(cluster, requirement),
    });

    remaining -= units;
  }

  const allocated = requirement.quantity - remaining;

  for (const allocation of allocations) {
    allocation.percentage =
      allocated > 0 ? (allocation.units / allocated) * 100 : 0;
  }

  const pooledCapacity = allocations.reduce(
    (sum, allocation) => sum + allocation.cluster.capacity,
    0,
  );

  const producersInvolved = allocations.reduce(
    (sum, allocation) => sum + allocation.cluster.producers.length,
    0,
  );

  const weightedReliability =
    allocations.length > 0
      ? allocations.reduce(
          (sum, allocation) =>
            sum +
            allocation.units *
              ((allocation.cluster.qualityScore +
                allocation.cluster.onTimeRate) /
                2),
          0,
        ) / allocated
      : 0;

  const estimatedCompletionDays = Math.max(
    5,
    Math.min(
      requirement.deadlineDays,
      Math.round(13 - weightedReliability / 12),
    ),
  );

  return {
    feasible: remaining === 0,
    pooledCapacity,
    requiredUnits: requirement.quantity,
    projectedOrderValue:
      requirement.quantity * requirement.budgetPerUnit,
    estimatedCompletionDays,
    producersInvolved,
    capacityUtilization:
      pooledCapacity > 0 ? (allocated / pooledCapacity) * 100 : 0,
    parsedRequirement: requirement,
    allocations,
  };
}

export function useListProducerClusters() {
  return useQuery({
    queryKey: ["sajha", "producer-clusters"],
    queryFn: async () => clusters,
    staleTime: Infinity,
  });
}

export function useHealthCheck() {
  return useQuery({
    queryKey: ["sajha", "health"],
    queryFn: async () => ({
      status: "healthy",
    }),
    staleTime: Infinity,
  });
}

export function useCreateMatchingPlan() {
  return useMutation({
    mutationFn: async (input: {
      data: {
        requirementText: string;
        parsedRequirement: ParsedRequirement;
      };
    }) => {
      await new Promise((resolve) => setTimeout(resolve, 650));
      return createPlan(input.data.parsedRequirement);
    },
  });
}
