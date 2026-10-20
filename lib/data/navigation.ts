// Generated from yanaybe/navigation-app-product-analytics (analysis/results.json and
// analysis/aggregates/). The repo runs on synthetic data generated against the client's
// production schema - no real user data - and CI fails if the committed numbers change.
// Do not hand-edit: regenerate from the repo instead.

export const navigationAnalytics = {
  "overall": {
    "presses": 17633,
    "acquired": 16260,
    "placeFound": 10625,
    "placeSaved": 9073
  },
  "funnelByOrigin": [
    {
      "origin": "share",
      "presses": 8297,
      "acquired": 8297,
      "placeFound": 6071,
      "placeSaved": 5174
    },
    {
      "origin": "button",
      "presses": 7963,
      "acquired": 7963,
      "placeFound": 4554,
      "placeSaved": 3899
    },
    {
      "origin": "(no capture)",
      "presses": 1373,
      "acquired": 0,
      "placeFound": 0,
      "placeSaved": 0
    }
  ],
  "recognitionRates": {
    "share": 73.2,
    "button": 57.2,
    "shareEndToEnd": 62.4,
    "buttonEndToEnd": 49.0
  },
  "noCaptureSharePct": 7.8,
  "releaseWindows": [
    {
      "release": "1.0.12",
      "origin": "button",
      "attempts": 3264,
      "recognized": 1898,
      "ratePct": 58.1
    },
    {
      "release": "1.0.12",
      "origin": "share",
      "attempts": 2245,
      "recognized": 1634,
      "ratePct": 72.8
    },
    {
      "release": "1.0.14",
      "origin": "button",
      "attempts": 1553,
      "recognized": 927,
      "ratePct": 59.7
    },
    {
      "release": "1.0.14",
      "origin": "share",
      "attempts": 1739,
      "recognized": 1297,
      "ratePct": 74.6
    },
    {
      "release": "1.0.15",
      "origin": "button",
      "attempts": 933,
      "recognized": 527,
      "ratePct": 56.5
    },
    {
      "release": "1.0.15",
      "origin": "share",
      "attempts": 1119,
      "recognized": 819,
      "ratePct": 73.2
    },
    {
      "release": "1.0.16",
      "origin": "button",
      "attempts": 869,
      "recognized": 517,
      "ratePct": 59.5
    },
    {
      "release": "1.0.16",
      "origin": "share",
      "attempts": 1225,
      "recognized": 983,
      "ratePct": 80.2
    },
    {
      "release": "1.0.17",
      "origin": "button",
      "attempts": 1020,
      "recognized": 685,
      "ratePct": 67.2
    },
    {
      "release": "1.0.17",
      "origin": "share",
      "attempts": 1635,
      "recognized": 1338,
      "ratePct": 81.8
    }
  ],
  "releaseTests": [
    {
      "name": "Share path, v1.0.15 → v1.0.16",
      "target": "share",
      "diffPp": 7.1,
      "ci": [
        3.6,
        10.5
      ],
      "p": 5.204170384781548e-05,
      "targeted": true
    },
    {
      "name": "Button path, v1.0.15 → v1.0.16",
      "target": "button",
      "diffPp": 3.0,
      "ci": [
        -1.5,
        7.6
      ],
      "p": 0.1960135992399924,
      "targeted": false
    },
    {
      "name": "Button path, v1.0.16 → v1.0.17",
      "target": "button",
      "diffPp": 7.7,
      "ci": [
        3.3,
        12.0
      ],
      "p": 0.0005591701731562408,
      "targeted": true
    },
    {
      "name": "Share path, v1.0.16 → v1.0.17",
      "target": "share",
      "diffPp": 1.6,
      "ci": [
        -1.3,
        4.5
      ],
      "p": 0.2819791992355436,
      "targeted": false
    }
  ],
  "mixShift": {
    "naivePooledPp": 12.1,
    "withinButtonPp": 9.0,
    "withinSharePp": 9.1,
    "mhOddsRatio": 1.57,
    "mhCi": [
      1.41,
      1.75
    ],
    "buttonShareStartPct": 59.2,
    "buttonShareEndPct": 38.4,
    "sharePathStartPct": 40.8,
    "sharePathEndPct": 61.6
  },
  "retention": {
    "installs": 3193,
    "firstSavedPct": 45.5,
    "firstNotSavedPct": 21.4,
    "ciSaved": [
      43.2,
      47.9
    ],
    "ciNotSaved": [
      19.4,
      23.6
    ],
    "adjustedOddsRatio": 3.12,
    "adjustedOrCi": [
      2.66,
      3.65
    ]
  },
  "failureReasons": [
    {
      "origin": "button",
      "reason": "transcription",
      "failures": 993
    },
    {
      "origin": "button",
      "reason": "no_place_in_text",
      "failures": 832
    },
    {
      "origin": "button",
      "reason": "no_candidates",
      "failures": 578
    },
    {
      "origin": "button",
      "reason": "recording",
      "failures": 303
    },
    {
      "origin": "button",
      "reason": "network",
      "failures": 270
    },
    {
      "origin": "button",
      "reason": "microphone_permission",
      "failures": 109
    },
    {
      "origin": "share",
      "reason": "no_place_in_text",
      "failures": 928
    },
    {
      "origin": "share",
      "reason": "no_candidates",
      "failures": 676
    },
    {
      "origin": "share",
      "reason": "network",
      "failures": 247
    },
    {
      "origin": "share",
      "reason": "storage",
      "failures": 41
    }
  ],
  "transcriptionShareOfButtonFailures": [
    {
      "release": "1.0.12",
      "pct": 35.2
    },
    {
      "release": "1.0.14",
      "pct": 31.5
    },
    {
      "release": "1.0.15",
      "pct": 32.5
    },
    {
      "release": "1.0.16",
      "pct": 32.4
    },
    {
      "release": "1.0.17",
      "pct": 20.6
    }
  ]
} as const;
