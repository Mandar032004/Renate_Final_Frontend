export const candidates = [
  {
    id: 1,
    slug: "alex-rivers",
    name: "Alex Rivers",
    title: "Lead Full Stack Engineer",
    score: "9.4",
    result: "PASSED",
    highlight: "Architected microservices for 10M+ users using Node.js & Go.",
    aiReasoning: "Alex demonstrates an exceptional alignment with the Principal Architect requirements. His trajectory through high-scale infrastructure combined with recent open-source contributions indicates a rare duality of stability and innovation.",
    insightChips: ["High Retention Probability", "Fast-Track Candidate", "Top 1% Market Benchmark"],
    status: "Scheduled",
    location: "London, UK",
    experience: "8 years",
    skills: ["Node.js", "Go", "Kubernetes", "PostgreSQL", "React"],
    dimensionalScores: [
      { label: "Technical Depth",      score: 94 },
      { label: "Consistency",          score: 91 },
      { label: "Communication Clarity", score: 87 },
      { label: "Problem Solving",      score: 93 },
      { label: "Culture Alignment",    score: 82 },
    ],
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAki24T-gLXWIv3XGUIfzT6gPXQ2OzzmCAunL2miyatlAW2xV0H_EIoDDbpP0Qf5va10I4_-cqFSyZFonXf94iMyHtE9Ufy3UmgR4gq67qsKLB-lXU9KGJCthq9OIOaacqa_QGgaJhtq2ARHdw-OwGsgBT-Mlj_opJW-y3rb0lRTUBTWJw9lCAG4gqOnnJGwPfm09jwDfDSCIEPMDwCLAjwNHeampF4vDxZQ0nZzHpqqRdbyKq2NbfGN48EC6yXAuvwlDFVg0upMfXl",
  },
  {
    id: 2,
    slug: "maya-chen",
    name: "Maya Chen",
    title: "Senior Backend Developer",
    score: "9.1",
    result: "PASSED",
    highlight: "Optimized query latency by 45% at Fortune 500 tech firm.",
    aiReasoning: "Maya shows consistent performance across all assessment dimensions. Her database optimisation track record at enterprise scale directly matches the backend architecture requirements of this role.",
    insightChips: ["Performance Specialist", "Enterprise Pedigree", "Immediate Contributor"],
    status: "In Review",
    location: "San Francisco, US",
    experience: "6 years",
    skills: ["Python", "Django", "Redis", "AWS", "MySQL"],
    dimensionalScores: [
      { label: "Technical Depth",      score: 91 },
      { label: "Consistency",          score: 88 },
      { label: "Communication Clarity", score: 79 },
      { label: "Problem Solving",      score: 90 },
      { label: "Culture Alignment",    score: 74 },
    ],
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKrynDcqm3U-4mra6sxxWxe4lviVyudhVv7RhH-8OICFQZv7yzDo4mdDFIQklH_yv96QWaeudPXShyacyckhDnMDcdT8UMwfo5AfYj-E3oE5vfkGD3bWH2umbw1MtGIGeu73RW1UgLcVlU4bC1gUlu-X-4yJjMRU218spyW9URAywhFMRs6BjcpZMlDYo8LlDIOGutSaBHPVUXgz1wY6P7rfyeCojh2BrTCKv4CGwFhAg-UnVcolbsFlJ1ZQe3YlmpAUtyZqr-Xtba",
  },
  {
    id: 3,
    slug: "jordan-smith",
    name: "Jordan Smith",
    title: "Full Stack Specialist",
    score: "8.8",
    result: "PASSED",
    highlight: "Open source contributor to React core libraries.",
    aiReasoning: "Jordan's open-source contributions signal strong public code quality and community standing. TypeScript expertise and Next.js proficiency closely match the front-end architecture priorities for this quarter.",
    insightChips: ["Open Source Contributor", "Community Leader", "Strong Culture Fit"],
    status: "Scheduled",
    location: "Berlin, DE",
    experience: "5 years",
    skills: ["React", "TypeScript", "GraphQL", "Next.js", "Tailwind CSS"],
    dimensionalScores: [
      { label: "Technical Depth",      score: 88 },
      { label: "Consistency",          score: 85 },
      { label: "Communication Clarity", score: 92 },
      { label: "Problem Solving",      score: 84 },
      { label: "Culture Alignment",    score: 90 },
    ],
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDszibP0_AoF_9aDmlpf0x9WrlWYDVGkST4bXjMgURhVa-LDI2yFqx0u5LnYtyBFaufzcp8y5oyg7IriXJW3RGwv7RAkAn88UCaW33b82-Plb4UmRHId4vk-F0rlZprmZUJic3xzLAkV8iG27Zc8RVWmCQwbvnUhiy3cLFQwtBSTfmzcLFxB_aNWv71ZpQzzprNtl8XEnhVMreg7hZKxOS6krgWIg_rbJd9Q_uidEhn5r0iCPEr5ahQaa5ZIO0rhJp3xCQK8x96anxn",
  },
];

export function getCandidateBySlug(slug) {
  return candidates.find((c) => c.slug === slug) ?? null;
}

export const reviewTeam = [
  {
    id: 1,
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBLSzowK6ZmJ6UCARVO2sMgd6hdRxDdbejnPX_PvEmdje8zxgFmXBL7U1cyeFlemvx4eMt9iW1pK4qMHlmxVAtwJvRDbsiwgfAbb_QtY_oics4zo0ChmwF7LRolzS0V7Wr059LkrySr0eD736M_hp05hRbV-ItKcoVGqIl0py1JVkDDaQOrelahja-fLSHDc8AzM9LC0o_MTuZOS1IZpCE5TQ81omgr7zh7zzrQeO9P6B54iMykj2NpShvVXWK3ZYGgfkEO_zXO8RvR",
  },
  {
    id: 2,
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9wexlK1km512-GmfefxP7F3Ns4dJTmmsz05b1AA3gPUorBZPzgPDKVx1ND252ViNgQdXhkIzS4xRdZO52YMWHHm-Bqv1A_CnXXnRsnRKTDStGQOdvICdAri2acXK8W_PsAkjvgZpvDIxQB0vBi_MNEuN9amp0IypKxdWuADI_UJ-ChINGWPJLoTFr_z4oTIdKxtXaAZUqPxAfoeWXRrHfVfR-bPxBi9oxlglljyWJT0EWyCYBqOFkIxMBEisi30nXrH1MLMt3P1St",
  },
  {
    id: 3,
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6yvINeXmtcPlaiaXqnIF6ucamTaR9FaLSF4EMyKalO1bLnz8ZSE-0H6Glu-8uurq4bp75uz-SX6XGO7kp1rC7qeNdj_Nw-UWXX5MEsbpLHv082ANB4Oo-XdJz4xHuof5B9QxDJSaBifYPii3hFON7wI2xNkykSO3nbHs5EAdAwHS-jWA1cvd2PCk_iQ6W6moAH6ABrKudU2Z1Tg5RQLekMcOTGZaV_-cxkRILNk-aTfhhhruUq8ZAwQQa9k0ONQzwToDKrEXXVp0i",
  },
];
