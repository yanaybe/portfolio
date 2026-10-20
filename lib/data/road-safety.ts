// Generated from yanaybe/israel-road-safety-analysis (analysis/results.json and
// analysis/aggregates/, commit HEAD). Every number here is produced by that repo's
// analysis script, which CI re-runs and fails if the committed values change.
// Source data: Israel CBS, "Road accidents with casualties, Public Use File", 2020-2024.
// Do not hand-edit: regenerate from the repo instead.

export const roadSafety = {
  "totalCrashes": 49941,
  "totalFatal": 1684,
  "years": [
    2020,
    2024
  ],
  "byYear": [
    {
      "year": 2020,
      "injury": 10836,
      "fatal": 286,
      "serious": 1899,
      "light": 8651,
      "fatalExclJS": 260,
      "ksiSharePct": 20.2
    },
    {
      "year": 2021,
      "injury": 11554,
      "fatal": 336,
      "serious": 2208,
      "light": 9010,
      "fatalExclJS": 303,
      "ksiSharePct": 22.0
    },
    {
      "year": 2022,
      "injury": 10404,
      "fatal": 319,
      "serious": 2320,
      "light": 7765,
      "fatalExclJS": 291,
      "ksiSharePct": 25.4
    },
    {
      "year": 2023,
      "injury": 8832,
      "fatal": 338,
      "serious": 2374,
      "light": 6120,
      "fatalExclJS": 307,
      "ksiSharePct": 30.7
    },
    {
      "year": 2024,
      "injury": 8315,
      "fatal": 405,
      "serious": 2452,
      "light": 5458,
      "fatalExclJS": 381,
      "ksiSharePct": 34.4
    }
  ],
  "changePct": {
    "fatal": 41.6,
    "serious": 29.1,
    "light": -36.9,
    "injury_crashes": -23.3
  },
  "fatalExclJsChangePct": 46.5,
  "interurbanShareOfFatalIncrease": 90.8,
  "decomposition": [
    {
      "road": "Interurban",
      "kind": "Front-to-side",
      "y2020": 21,
      "y2024": 54,
      "change": 33
    },
    {
      "road": "Interurban",
      "kind": "Other",
      "y2020": 17,
      "y2024": 41,
      "change": 24
    },
    {
      "road": "Interurban",
      "kind": "Pedestrian hit",
      "y2020": 13,
      "y2024": 36,
      "change": 23
    },
    {
      "road": "Interurban",
      "kind": "Rear-end",
      "y2020": 33,
      "y2024": 48,
      "change": 15
    },
    {
      "road": "Urban",
      "kind": "Pedestrian hit",
      "y2020": 65,
      "y2024": 78,
      "change": 13
    },
    {
      "road": "Interurban",
      "kind": "Hit fixed object",
      "y2020": 12,
      "y2024": 20,
      "change": 8
    },
    {
      "road": "Interurban",
      "kind": "Head-on",
      "y2020": 33,
      "y2024": 39,
      "change": 6
    },
    {
      "road": "Urban",
      "kind": "Head-on",
      "y2020": 3,
      "y2024": 6,
      "change": 3
    },
    {
      "road": "Urban",
      "kind": "Other",
      "y2020": 16,
      "y2024": 18,
      "change": 2
    },
    {
      "road": "Urban",
      "kind": "Rear-end",
      "y2020": 8,
      "y2024": 9,
      "change": 1
    },
    {
      "road": "Urban",
      "kind": "Off-road / rollover",
      "y2020": 10,
      "y2024": 10,
      "change": 0
    },
    {
      "road": "Interurban",
      "kind": "Off-road / rollover",
      "y2020": 19,
      "y2024": 18,
      "change": -1
    },
    {
      "road": "Urban",
      "kind": "Front-to-side",
      "y2020": 21,
      "y2024": 19,
      "change": -2
    },
    {
      "road": "Urban",
      "kind": "Hit fixed object",
      "y2020": 15,
      "y2024": 9,
      "change": -6
    }
  ],
  "oddsRatios": [
    {
      "label": "crash: Head-on",
      "or": 1.1177223055468586,
      "lo": 0.9107233022526068,
      "hi": 1.3717702722955765
    },
    {
      "label": "crash: Pedestrian hit",
      "or": 2.2413492967863493,
      "lo": 1.8521758075097463,
      "hi": 2.7122947237708304
    },
    {
      "label": "crash: Off-road / rollover",
      "or": 1.7243383307633733,
      "lo": 1.360789369860324,
      "hi": 2.185013158388363
    },
    {
      "label": "crash: Hit fixed object",
      "or": 1.5563053110216754,
      "lo": 1.2385786837803776,
      "hi": 1.9555368204154833
    },
    {
      "label": "road: Interurban, between junctions",
      "or": 2.833827505258386,
      "lo": 2.2941597666837876,
      "hi": 3.5004442350443545
    },
    {
      "label": "road: Interurban, junction",
      "or": 1.3619888818857866,
      "lo": 1.0692724577695705,
      "hi": 1.734837272672231
    },
    {
      "label": "speed_limit: 100-120",
      "or": 3.2747562950601856,
      "lo": 2.5163301781971525,
      "hi": 4.261773309780691
    },
    {
      "label": "speed_limit: 80-90",
      "or": 2.3679056336201447,
      "lo": 1.956741802220598,
      "hi": 2.865465992174834
    },
    {
      "label": "light: Night, unlit or broken lights",
      "or": 2.1871528974836894,
      "lo": 1.808034035674619,
      "hi": 2.6457675588979788
    },
    {
      "label": "light: Night, lit",
      "or": 1.4995232632685762,
      "lo": 1.3366495764768243,
      "hi": 1.6822434665415293
    },
    {
      "label": "weekend: True",
      "or": 1.1515261322186952,
      "lo": 1.027065075179209,
      "hi": 1.291069539046663
    }
  ],
  "cvAuc": 0.764,
  "pedestrianCityLitPct": 8.2,
  "pedestrianInterurbanUnlitPct": 38.8,
  "segmentCount": 3899,
  "ebAlpha": 0.297,
  "hotspots": [
    {
      "method": "Raw crash count",
      "size": 20,
      "predicted": 126.1019538188277,
      "actual": 86,
      "errorPct": 46.630178859101974
    },
    {
      "method": "Empirical Bayes",
      "size": 20,
      "predicted": 74.86538956719885,
      "actual": 95,
      "errorPct": -21.194326771369635
    },
    {
      "method": "Raw crash count",
      "size": 50,
      "predicted": 248.18792184724688,
      "actual": 164,
      "errorPct": 51.334098687345666
    },
    {
      "method": "Empirical Bayes",
      "size": 50,
      "predicted": 143.88935647369212,
      "actual": 173,
      "errorPct": -16.82696157590051
    }
  ],
  "topSegments": [
    {
      "road": 20,
      "km": 14,
      "district": "Tel Aviv",
      "ksi": 20,
      "fatal": 1,
      "light": 72,
      "ebPerYear": 2.88,
      "excessPerYear": 1.74
    },
    {
      "road": 4,
      "km": 109,
      "district": "Tel Aviv",
      "ksi": 20,
      "fatal": 4,
      "light": 29,
      "ebPerYear": 2.45,
      "excessPerYear": 1.66
    },
    {
      "road": 44,
      "km": 34,
      "district": "Central",
      "ksi": 19,
      "fatal": 2,
      "light": 19,
      "ebPerYear": 2.15,
      "excessPerYear": 1.49
    },
    {
      "road": 20,
      "km": 16,
      "district": "Tel Aviv",
      "ksi": 17,
      "fatal": 3,
      "light": 39,
      "ebPerYear": 2.26,
      "excessPerYear": 1.38
    },
    {
      "road": 4,
      "km": 122,
      "district": "Tel Aviv",
      "ksi": 16,
      "fatal": 2,
      "light": 50,
      "ebPerYear": 2.25,
      "excessPerYear": 1.27
    },
    {
      "road": 20,
      "km": 13,
      "district": "Tel Aviv",
      "ksi": 16,
      "fatal": 2,
      "light": 55,
      "ebPerYear": 2.29,
      "excessPerYear": 1.27
    },
    {
      "road": 4,
      "km": 115,
      "district": "Tel Aviv",
      "ksi": 16,
      "fatal": 1,
      "light": 31,
      "ebPerYear": 2.06,
      "excessPerYear": 1.25
    },
    {
      "road": 4,
      "km": 112,
      "district": "Tel Aviv",
      "ksi": 13,
      "fatal": 1,
      "light": 29,
      "ebPerYear": 1.72,
      "excessPerYear": 0.94
    },
    {
      "road": 20,
      "km": 19,
      "district": "Tel Aviv",
      "ksi": 12,
      "fatal": 1,
      "light": 19,
      "ebPerYear": 1.49,
      "excessPerYear": 0.82
    },
    {
      "road": 20,
      "km": 8,
      "district": "Tel Aviv",
      "ksi": 11,
      "fatal": 2,
      "light": 24,
      "ebPerYear": 1.46,
      "excessPerYear": 0.73
    },
    {
      "road": 70,
      "km": 52,
      "district": "Haifa",
      "ksi": 11,
      "fatal": 1,
      "light": 32,
      "ebPerYear": 1.55,
      "excessPerYear": 0.73
    },
    {
      "road": 44,
      "km": 37,
      "district": "Tel Aviv",
      "ksi": 11,
      "fatal": 1,
      "light": 10,
      "ebPerYear": 1.21,
      "excessPerYear": 0.7
    },
    {
      "road": 4,
      "km": 223,
      "district": "Haifa",
      "ksi": 10,
      "fatal": 1,
      "light": 22,
      "ebPerYear": 1.34,
      "excessPerYear": 0.63
    },
    {
      "road": 65,
      "km": 20,
      "district": "Haifa",
      "ksi": 10,
      "fatal": 2,
      "light": 22,
      "ebPerYear": 1.34,
      "excessPerYear": 0.63
    },
    {
      "road": 20,
      "km": 9,
      "district": "Tel Aviv",
      "ksi": 10,
      "fatal": 2,
      "light": 24,
      "ebPerYear": 1.36,
      "excessPerYear": 0.63
    }
  ],
  "heatmap": [
    [
      1,
      0,
      162,
      49,
      11
    ],
    [
      1,
      1,
      103,
      43,
      6
    ],
    [
      1,
      2,
      65,
      24,
      4
    ],
    [
      1,
      3,
      53,
      26,
      5
    ],
    [
      1,
      4,
      45,
      21,
      7
    ],
    [
      1,
      5,
      109,
      33,
      5
    ],
    [
      1,
      6,
      205,
      50,
      8
    ],
    [
      1,
      7,
      425,
      93,
      14
    ],
    [
      1,
      8,
      452,
      94,
      6
    ],
    [
      1,
      9,
      392,
      98,
      8
    ],
    [
      1,
      10,
      448,
      125,
      12
    ],
    [
      1,
      11,
      399,
      98,
      13
    ],
    [
      1,
      12,
      460,
      113,
      13
    ],
    [
      1,
      13,
      502,
      125,
      13
    ],
    [
      1,
      14,
      530,
      115,
      13
    ],
    [
      1,
      15,
      562,
      142,
      16
    ],
    [
      1,
      16,
      539,
      124,
      12
    ],
    [
      1,
      17,
      559,
      142,
      15
    ],
    [
      1,
      18,
      491,
      108,
      6
    ],
    [
      1,
      19,
      418,
      98,
      3
    ],
    [
      1,
      20,
      337,
      92,
      16
    ],
    [
      1,
      21,
      313,
      65,
      11
    ],
    [
      1,
      22,
      219,
      61,
      9
    ],
    [
      1,
      23,
      192,
      52,
      8
    ],
    [
      2,
      0,
      113,
      33,
      5
    ],
    [
      2,
      1,
      85,
      22,
      4
    ],
    [
      2,
      2,
      42,
      8,
      2
    ],
    [
      2,
      3,
      27,
      11,
      1
    ],
    [
      2,
      4,
      43,
      25,
      8
    ],
    [
      2,
      5,
      83,
      37,
      9
    ],
    [
      2,
      6,
      185,
      58,
      6
    ],
    [
      2,
      7,
      406,
      95,
      13
    ],
    [
      2,
      8,
      424,
      69,
      6
    ],
    [
      2,
      9,
      352,
      92,
      14
    ],
    [
      2,
      10,
      411,
      102,
      8
    ],
    [
      2,
      11,
      399,
      97,
      13
    ],
    [
      2,
      12,
      440,
      92,
      5
    ],
    [
      2,
      13,
      501,
      119,
      10
    ],
    [
      2,
      14,
      489,
      109,
      14
    ],
    [
      2,
      15,
      453,
      104,
      9
    ],
    [
      2,
      16,
      542,
      132,
      10
    ],
    [
      2,
      17,
      542,
      146,
      18
    ],
    [
      2,
      18,
      481,
      123,
      21
    ],
    [
      2,
      19,
      353,
      106,
      14
    ],
    [
      2,
      20,
      348,
      79,
      9
    ],
    [
      2,
      21,
      290,
      75,
      14
    ],
    [
      2,
      22,
      237,
      67,
      11
    ],
    [
      2,
      23,
      197,
      45,
      6
    ],
    [
      3,
      0,
      142,
      34,
      7
    ],
    [
      3,
      1,
      67,
      23,
      3
    ],
    [
      3,
      2,
      61,
      22,
      6
    ],
    [
      3,
      3,
      43,
      19,
      4
    ],
    [
      3,
      4,
      29,
      9,
      3
    ],
    [
      3,
      5,
      70,
      28,
      6
    ],
    [
      3,
      6,
      200,
      59,
      12
    ],
    [
      3,
      7,
      373,
      89,
      9
    ],
    [
      3,
      8,
      419,
      96,
      10
    ],
    [
      3,
      9,
      390,
      80,
      6
    ],
    [
      3,
      10,
      378,
      89,
      15
    ],
    [
      3,
      11,
      402,
      98,
      5
    ],
    [
      3,
      12,
      447,
      107,
      10
    ],
    [
      3,
      13,
      474,
      107,
      12
    ],
    [
      3,
      14,
      501,
      131,
      16
    ],
    [
      3,
      15,
      528,
      124,
      15
    ],
    [
      3,
      16,
      569,
      117,
      14
    ],
    [
      3,
      17,
      538,
      123,
      14
    ],
    [
      3,
      18,
      498,
      134,
      17
    ],
    [
      3,
      19,
      431,
      104,
      10
    ],
    [
      3,
      20,
      367,
      102,
      17
    ],
    [
      3,
      21,
      279,
      74,
      9
    ],
    [
      3,
      22,
      276,
      71,
      11
    ],
    [
      3,
      23,
      218,
      54,
      8
    ],
    [
      4,
      0,
      119,
      32,
      11
    ],
    [
      4,
      1,
      72,
      22,
      3
    ],
    [
      4,
      2,
      47,
      14,
      3
    ],
    [
      4,
      3,
      37,
      17,
      3
    ],
    [
      4,
      4,
      36,
      17,
      9
    ],
    [
      4,
      5,
      84,
      40,
      8
    ],
    [
      4,
      6,
      193,
      62,
      9
    ],
    [
      4,
      7,
      367,
      79,
      9
    ],
    [
      4,
      8,
      426,
      99,
      9
    ],
    [
      4,
      9,
      376,
      100,
      10
    ],
    [
      4,
      10,
      384,
      83,
      5
    ],
    [
      4,
      11,
      376,
      72,
      7
    ],
    [
      4,
      12,
      434,
      105,
      15
    ],
    [
      4,
      13,
      471,
      113,
      6
    ],
    [
      4,
      14,
      510,
      124,
      10
    ],
    [
      4,
      15,
      537,
      120,
      13
    ],
    [
      4,
      16,
      542,
      113,
      16
    ],
    [
      4,
      17,
      571,
      141,
      22
    ],
    [
      4,
      18,
      489,
      131,
      13
    ],
    [
      4,
      19,
      375,
      98,
      13
    ],
    [
      4,
      20,
      400,
      108,
      6
    ],
    [
      4,
      21,
      287,
      80,
      15
    ],
    [
      4,
      22,
      203,
      61,
      8
    ],
    [
      4,
      23,
      220,
      67,
      14
    ],
    [
      5,
      0,
      118,
      38,
      7
    ],
    [
      5,
      1,
      87,
      27,
      6
    ],
    [
      5,
      2,
      46,
      21,
      3
    ],
    [
      5,
      3,
      49,
      22,
      6
    ],
    [
      5,
      4,
      31,
      14,
      4
    ],
    [
      5,
      5,
      96,
      28,
      6
    ],
    [
      5,
      6,
      177,
      53,
      8
    ],
    [
      5,
      7,
      394,
      103,
      11
    ],
    [
      5,
      8,
      445,
      84,
      10
    ],
    [
      5,
      9,
      376,
      87,
      16
    ],
    [
      5,
      10,
      398,
      97,
      14
    ],
    [
      5,
      11,
      423,
      99,
      10
    ],
    [
      5,
      12,
      477,
      128,
      10
    ],
    [
      5,
      13,
      546,
      135,
      20
    ],
    [
      5,
      14,
      513,
      118,
      12
    ],
    [
      5,
      15,
      588,
      137,
      13
    ],
    [
      5,
      16,
      542,
      130,
      19
    ],
    [
      5,
      17,
      533,
      119,
      19
    ],
    [
      5,
      18,
      488,
      142,
      14
    ],
    [
      5,
      19,
      423,
      134,
      26
    ],
    [
      5,
      20,
      357,
      99,
      16
    ],
    [
      5,
      21,
      355,
      97,
      14
    ],
    [
      5,
      22,
      286,
      69,
      6
    ],
    [
      5,
      23,
      276,
      80,
      12
    ],
    [
      6,
      0,
      231,
      81,
      10
    ],
    [
      6,
      1,
      170,
      54,
      10
    ],
    [
      6,
      2,
      136,
      41,
      8
    ],
    [
      6,
      3,
      121,
      37,
      6
    ],
    [
      6,
      4,
      89,
      31,
      7
    ],
    [
      6,
      5,
      110,
      40,
      9
    ],
    [
      6,
      6,
      164,
      51,
      8
    ],
    [
      6,
      7,
      299,
      78,
      13
    ],
    [
      6,
      8,
      288,
      78,
      6
    ],
    [
      6,
      9,
      309,
      84,
      6
    ],
    [
      6,
      10,
      335,
      83,
      14
    ],
    [
      6,
      11,
      416,
      117,
      12
    ],
    [
      6,
      12,
      453,
      125,
      10
    ],
    [
      6,
      13,
      460,
      109,
      6
    ],
    [
      6,
      14,
      441,
      127,
      15
    ],
    [
      6,
      15,
      475,
      142,
      11
    ],
    [
      6,
      16,
      405,
      121,
      13
    ],
    [
      6,
      17,
      357,
      111,
      10
    ],
    [
      6,
      18,
      366,
      105,
      13
    ],
    [
      6,
      19,
      246,
      69,
      17
    ],
    [
      6,
      20,
      203,
      50,
      14
    ],
    [
      6,
      21,
      188,
      53,
      10
    ],
    [
      6,
      22,
      222,
      76,
      17
    ],
    [
      6,
      23,
      246,
      77,
      15
    ],
    [
      7,
      0,
      128,
      40,
      5
    ],
    [
      7,
      1,
      123,
      35,
      9
    ],
    [
      7,
      2,
      111,
      44,
      5
    ],
    [
      7,
      3,
      66,
      23,
      4
    ],
    [
      7,
      4,
      63,
      24,
      4
    ],
    [
      7,
      5,
      56,
      22,
      4
    ],
    [
      7,
      6,
      66,
      23,
      9
    ],
    [
      7,
      7,
      82,
      26,
      2
    ],
    [
      7,
      8,
      84,
      35,
      9
    ],
    [
      7,
      9,
      120,
      38,
      8
    ],
    [
      7,
      10,
      153,
      57,
      4
    ],
    [
      7,
      11,
      160,
      45,
      4
    ],
    [
      7,
      12,
      203,
      70,
      10
    ],
    [
      7,
      13,
      212,
      53,
      11
    ],
    [
      7,
      14,
      245,
      72,
      6
    ],
    [
      7,
      15,
      275,
      59,
      4
    ],
    [
      7,
      16,
      284,
      85,
      8
    ],
    [
      7,
      17,
      256,
      80,
      16
    ],
    [
      7,
      18,
      321,
      88,
      19
    ],
    [
      7,
      19,
      294,
      75,
      12
    ],
    [
      7,
      20,
      372,
      84,
      14
    ],
    [
      7,
      21,
      311,
      75,
      9
    ],
    [
      7,
      22,
      292,
      89,
      15
    ],
    [
      7,
      23,
      231,
      65,
      11
    ]
  ],
  "fatalRateNightPct": 6.9,
  "fatalRateDayPct": 2.7,
  "fatalRateByWeekday": [
    {
      "day": "Sun",
      "pct": 2.93
    },
    {
      "day": "Mon",
      "pct": 3.09
    },
    {
      "day": "Tue",
      "pct": 3.1
    },
    {
      "day": "Wed",
      "pct": 3.14
    },
    {
      "day": "Thu",
      "pct": 3.51
    },
    {
      "day": "Fri",
      "pct": 3.86
    },
    {
      "day": "Sat",
      "pct": 4.48
    }
  ],
  "dataQuality": [
    {
      "state": "lighting known",
      "crashes": 40985,
      "ksiPct": 21.0
    },
    {
      "state": "lighting unknown",
      "crashes": 8956,
      "ksiPct": 48.5
    },
    {
      "state": "speed limit known",
      "crashes": 44421,
      "ksiPct": 21.1
    },
    {
      "state": "speed limit unknown",
      "crashes": 5520,
      "ksiPct": 65.0
    }
  ]
} as const;
