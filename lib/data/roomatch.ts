// Generated from yanaybe/roomatch-matching-analysis (analysis/results.json and
// analysis/aggregates/). The repo runs on synthetic data with RooMatch's production
// schema, scored by the production algorithm ported to Python and verified against the
// live TypeScript on 1,500 pairs. CI fails if the committed numbers change.
// Do not hand-edit: regenerate from the repo instead.

export const roomatchAnalysis = {
  "scoreBands": [
    {
      "band": "15 (floor)",
      "swipes": 48686,
      "likes": 2759,
      "pairsBothSaw": 5046,
      "mutualPairs": 21,
      "twoWayChats": 2,
      "likeRatePct": 5.7,
      "mutualRatePct": 0.42
    },
    {
      "band": "16-29",
      "swipes": 51161,
      "likes": 5123,
      "pairsBothSaw": 5262,
      "mutualPairs": 72,
      "twoWayChats": 12,
      "likeRatePct": 10.0,
      "mutualRatePct": 1.37
    },
    {
      "band": "30-44",
      "swipes": 83300,
      "likes": 12041,
      "pairsBothSaw": 8781,
      "mutualPairs": 243,
      "twoWayChats": 43,
      "likeRatePct": 14.5,
      "mutualRatePct": 2.77
    },
    {
      "band": "45-59",
      "swipes": 87240,
      "likes": 17469,
      "pairsBothSaw": 9289,
      "mutualPairs": 479,
      "twoWayChats": 88,
      "likeRatePct": 20.0,
      "mutualRatePct": 5.16
    },
    {
      "band": "60-74",
      "swipes": 45712,
      "likes": 11728,
      "pairsBothSaw": 4946,
      "mutualPairs": 388,
      "twoWayChats": 104,
      "likeRatePct": 25.7,
      "mutualRatePct": 7.84
    },
    {
      "band": "75+",
      "swipes": 8955,
      "likes": 2868,
      "pairsBothSaw": 976,
      "mutualPairs": 118,
      "twoWayChats": 39,
      "likeRatePct": 32.0,
      "mutualRatePct": 12.09
    }
  ],
  "aucLadder": [
    {
      "model": "Production score alone",
      "auc": 0.646
    },
    {
      "model": "+ target popularity control",
      "auc": 0.697
    },
    {
      "model": "Re-weighted, same factors",
      "auc": 0.719
    },
    {
      "model": "+ gender preference",
      "auc": 0.79
    }
  ],
  "coefficients": [
    {
      "factor": "gender_mismatch",
      "coef": -2.869,
      "lo": -2.937,
      "hi": -2.8
    },
    {
      "factor": "budget_ratio",
      "coef": -1.28,
      "lo": -1.361,
      "hi": -1.199
    },
    {
      "factor": "smoking_conflict",
      "coef": -1.207,
      "lo": -1.259,
      "hi": -1.156
    },
    {
      "factor": "sleep_opposite",
      "coef": -0.786,
      "lo": -0.822,
      "hi": -0.751
    },
    {
      "factor": "pet_conflict",
      "coef": -0.491,
      "lo": -0.543,
      "hi": -0.439
    },
    {
      "factor": "age_fit",
      "coef": 0.435,
      "lo": 0.39,
      "hi": 0.479
    },
    {
      "factor": "religious_gap",
      "coef": -0.258,
      "lo": -0.272,
      "hi": -0.245
    },
    {
      "factor": "noise_sim",
      "coef": 0.261,
      "lo": 0.22,
      "hi": 0.302
    },
    {
      "factor": "clean_conflict",
      "coef": -0.233,
      "lo": -0.245,
      "hi": -0.221
    },
    {
      "factor": "social_sim",
      "coef": 0.222,
      "lo": 0.181,
      "hi": 0.263
    },
    {
      "factor": "move_in_months",
      "coef": -0.212,
      "lo": -0.223,
      "hi": -0.202
    },
    {
      "factor": "vibe_same",
      "coef": -0.0,
      "lo": -0.026,
      "hi": 0.026
    },
    {
      "factor": "target_popularity",
      "coef": 0.835,
      "lo": 0.815,
      "hi": 0.855
    }
  ],
  "nSwipes": 325054,
  "nTestSwipes": 95118,
  "floorShareOfCardsPct": 15.0,
  "unseenLikes": {
    "likes": 51988,
    "neverSaw": 40639,
    "likedBack": 2642,
    "passedBack": 8707,
    "neverSawPct": 78.2
  },
  "exposureDecay": [
    {
      "week": 0,
      "impressions": 140746,
      "profilesShown": 3834,
      "eligible": 3834
    },
    {
      "week": 1,
      "impressions": 28289,
      "profilesShown": 3531,
      "eligible": 3834
    },
    {
      "week": 2,
      "impressions": 11394,
      "profilesShown": 2763,
      "eligible": 3834
    },
    {
      "week": 3,
      "impressions": 6252,
      "profilesShown": 2195,
      "eligible": 3834
    },
    {
      "week": 4,
      "impressions": 3593,
      "profilesShown": 1714,
      "eligible": 3834
    },
    {
      "week": 5,
      "impressions": 2465,
      "profilesShown": 1377,
      "eligible": 3834
    },
    {
      "week": 6,
      "impressions": 1838,
      "profilesShown": 1061,
      "eligible": 3834
    },
    {
      "week": 7,
      "impressions": 1704,
      "profilesShown": 1114,
      "eligible": 3834
    }
  ],
  "cityLiquidity": [
    {
      "city": "Tel Aviv",
      "newUsers": 1454,
      "matched": 349,
      "pool": 1817,
      "medianBudget": 3600,
      "matchRatePct": 24.0
    },
    {
      "city": "Jerusalem",
      "newUsers": 787,
      "matched": 241,
      "pool": 977,
      "medianBudget": 2550,
      "matchRatePct": 30.6
    },
    {
      "city": "Haifa",
      "newUsers": 601,
      "matched": 147,
      "pool": 736,
      "medianBudget": 2100,
      "matchRatePct": 24.5
    },
    {
      "city": "Beer Sheva",
      "newUsers": 484,
      "matched": 124,
      "pool": 590,
      "medianBudget": 1750,
      "matchRatePct": 25.6
    },
    {
      "city": "Ramat Gan",
      "newUsers": 426,
      "matched": 132,
      "pool": 534,
      "medianBudget": 3200,
      "matchRatePct": 31.0
    },
    {
      "city": "Rishon LeZion",
      "newUsers": 289,
      "matched": 95,
      "pool": 353,
      "medianBudget": 2700,
      "matchRatePct": 32.9
    },
    {
      "city": "Petah Tikva",
      "newUsers": 243,
      "matched": 92,
      "pool": 296,
      "medianBudget": 2600,
      "matchRatePct": 37.9
    },
    {
      "city": "Netanya",
      "newUsers": 229,
      "matched": 68,
      "pool": 292,
      "medianBudget": 2475,
      "matchRatePct": 29.7
    },
    {
      "city": "Herzliya",
      "newUsers": 205,
      "matched": 43,
      "pool": 268,
      "medianBudget": 3800,
      "matchRatePct": 21.0
    },
    {
      "city": "Ashdod",
      "newUsers": 108,
      "matched": 36,
      "pool": 137,
      "medianBudget": 2200,
      "matchRatePct": 33.3
    }
  ]
} as const;
