import { useState, useEffect, useRef, useMemo } from "react";

// ─── PROGRAM DATA ────────────────────────────────────────────────────────────
const PROGRAM = {
  1: {
    1: { label: "Squat / Bench / Accessories", exercises: [
      { name: "Competition Squat", sets: 4, reps: "7", intensity: 0.67, lift: "squat", tempo: "1.0.1", rest: 180 },
      { name: "Paused Bench", sets: 4, reps: "7", intensity: 0.67, lift: "bench", tempo: "1.1.1", rest: 180 },
      { name: "Overhead Press", sets: 3, reps: "8", intensity: "7 RPE", lift: null, tempo: "1.0.1", rest: 120 },
      { name: "Bent Over Row", sets: 3, reps: "12", intensity: "7 RPE", lift: null, tempo: "1.0.1", rest: 90 },
      { name: "GHR Back Extensions", sets: 4, reps: "12", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 60 },
    ]},
    2: { label: "Deadlift / Bench / Accessories", exercises: [
      { name: "Competition Deadlift", sets: 4, reps: "7", intensity: 0.67, lift: "deadlift", tempo: "1.0.1", rest: 180 },
      { name: "3ct Pause Bench", sets: 3, reps: "5", intensity: 0.60, lift: "bench", tempo: "1.3.1", rest: 180 },
      { name: "SSB or High Bar Pause Squat", sets: 3, reps: "5", intensity: "8 RPE", lift: null, tempo: "1.2.1", rest: 180 },
      { name: "Wide Grip Seated Row", sets: 5, reps: "8", intensity: "8 RPE", lift: null, tempo: "1.1.1", rest: 90 },
    ]},
    3: { label: "Squat / Bench / Accessories", exercises: [
      { name: "Pin Squat (pins at full depth)", sets: 3, reps: "6", intensity: 0.65, lift: "squat", tempo: "1.1.1", rest: 120 },
      { name: "2 Board Press", sets: 3, reps: "6", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 60 },
      { name: "1-Arm DB Rows", sets: 5, reps: "10", intensity: "7.5 RPE", lift: null, tempo: "1.0.1", rest: 90 },
      { name: "Birddogs (reps per side)", sets: 3, reps: "6", intensity: "7 RPE", lift: null, tempo: "1.1.1", rest: 90 },
    ]},
    4: { label: "Deadlift / Bench / Accessories", exercises: [
      { name: "2ct Pause Deadlift (barely off floor)", sets: 3, reps: "6", intensity: 0.63, lift: "deadlift", tempo: "x", rest: 120 },
      { name: "Rep Bench (Touch and Go)", sets: 4, reps: "10", intensity: 0.63, lift: "bench", tempo: "1.0.1", rest: 120 },
      { name: "Stiff-Legged Deadlift", sets: 3, reps: "8", intensity: 0.40, lift: "deadlift", tempo: "1.0.1", rest: 180 },
      { name: "Vertical Pull of choice", sets: 4, reps: "10", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 90 },
      { name: "Tricep movement of choice", sets: 4, reps: "10", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 90 },
    ]},
  },
  2: {
    1: { label: "Squat / Bench / Accessories", exercises: [
      { name: "Competition Squat", sets: 4, reps: "6", intensity: 0.70, lift: "squat", tempo: "1.0.1", rest: 180 },
      { name: "Paused Bench", sets: 4, reps: "6", intensity: 0.70, lift: "bench", tempo: "1.1.1", rest: 180 },
      { name: "Overhead Press", sets: 3, reps: "8", intensity: "7 RPE", lift: null, tempo: "1.0.1", rest: 120 },
      { name: "Bent Over Row", sets: 3, reps: "12", intensity: "7 RPE", lift: null, tempo: "1.0.1", rest: 90 },
      { name: "GHR Back Extensions", sets: 4, reps: "12", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 60 },
    ]},
    2: { label: "Deadlift / Bench / Accessories", exercises: [
      { name: "Competition Deadlift", sets: 4, reps: "6", intensity: 0.70, lift: "deadlift", tempo: "1.0.1", rest: 180 },
      { name: "3ct Pause Bench", sets: 3, reps: "6", intensity: 0.60, lift: "bench", tempo: "1.3.1", rest: 180 },
      { name: "SSB or High Bar Pause Squat", sets: 3, reps: "6", intensity: "8 RPE", lift: null, tempo: "1.2.1", rest: 45 },
      { name: "Wide Grip Seated Row", sets: 5, reps: "8", intensity: "8 RPE", lift: null, tempo: "1.1.1", rest: 90 },
    ]},
    3: { label: "Squat / Bench / Accessories", exercises: [
      { name: "Pin Squat (pins at full depth)", sets: 3, reps: "5", intensity: 0.70, lift: "squat", tempo: "1.1.1", rest: 120 },
      { name: "2 Board Press", sets: 3, reps: "5", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 60 },
      { name: "1-Arm DB Rows", sets: 5, reps: "10", intensity: "7.5 RPE", lift: null, tempo: "1.0.1", rest: 90 },
      { name: "Birddogs (reps per side)", sets: 3, reps: "6", intensity: "7 RPE", lift: null, tempo: "1.1.1", rest: 90 },
    ]},
    4: { label: "Deadlift / Bench / Accessories", exercises: [
      { name: "2ct Pause Deadlift (barely off floor)", sets: 3, reps: "5", intensity: 0.65, lift: "deadlift", tempo: "x", rest: 120 },
      { name: "Rep Bench (Touch and Go)", sets: 4, reps: "10", intensity: 0.65, lift: "bench", tempo: "1.0.1", rest: 120 },
      { name: "Stiff-Legged Deadlift", sets: 3, reps: "8", intensity: 0.43, lift: "deadlift", tempo: "1.0.1", rest: 180 },
      { name: "Vertical Pull of choice", sets: 4, reps: "10", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 90 },
      { name: "Tricep movement of choice", sets: 4, reps: "10", intensity: "8 RPE", lift: null, tempo: "1.1.1", rest: 90 },
    ]},
  },
  3: {
    1: { label: "Squat / Bench / Accessories", exercises: [
      { name: "Competition Squat", sets: 4, reps: "6", intensity: 0.73, lift: "squat", tempo: "1.0.1", rest: 180 },
      { name: "Paused Bench", sets: 4, reps: "6", intensity: 0.73, lift: "bench", tempo: "1.1.1", rest: 180 },
      { name: "Overhead Press", sets: 3, reps: "7", intensity: "7 RPE", lift: null, tempo: "1.0.1", rest: 120 },
      { name: "Bent Over Row", sets: 3, reps: "8", intensity: "7 RPE", lift: null, tempo: "1.0.1", rest: 90 },
      { name: "GHR Back Extensions", sets: 5, reps: "10", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 60 },
    ]},
    2: { label: "Deadlift / Bench / Accessories", exercises: [
      { name: "Competition Deadlift", sets: 4, reps: "6", intensity: 0.73, lift: "deadlift", tempo: "1.0.1", rest: 180 },
      { name: "3ct Pause Bench", sets: 3, reps: "4", intensity: 0.65, lift: "bench", tempo: "1.3.1", rest: 180 },
      { name: "SSB or High Bar Pause Squat", sets: 3, reps: "4", intensity: "8 RPE", lift: null, tempo: "1.2.1", rest: 180 },
      { name: "Wide Grip Seated Row", sets: 5, reps: "8", intensity: "8 RPE", lift: null, tempo: "1.1.1", rest: 90 },
    ]},
    3: { label: "Squat / Bench / Accessories", exercises: [
      { name: "Pin Squat (pins at full depth)", sets: 3, reps: "6", intensity: 0.68, lift: "squat", tempo: "1.1.1", rest: 120 },
      { name: "2 Board Press", sets: 3, reps: "4", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 60 },
      { name: "1-Arm DB Rows", sets: 5, reps: "8", intensity: "7.5 RPE", lift: null, tempo: "1.0.1", rest: 90 },
      { name: "Birddogs (reps per side)", sets: 3, reps: "8", intensity: "7 RPE", lift: null, tempo: "1.1.1", rest: 90 },
    ]},
    4: { label: "Deadlift / Bench / Accessories", exercises: [
      { name: "2ct Pause Deadlift (barely off floor)", sets: 3, reps: "6", intensity: 0.68, lift: "deadlift", tempo: "x", rest: 120 },
      { name: "Rep Bench (Touch and Go)", sets: 4, reps: "10", intensity: 0.68, lift: "bench", tempo: "1.0.1", rest: 120 },
      { name: "Stiff-Legged Deadlift", sets: 3, reps: "6", intensity: 0.45, lift: "deadlift", tempo: "1.0.1", rest: 180 },
      { name: "Vertical Pull of choice", sets: 4, reps: "8", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 90 },
      { name: "Tricep movement of choice", sets: 4, reps: "8", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 90 },
    ]},
  },
  4: {
    1: { label: "Squat / Bench / Accessories", exercises: [
      { name: "Competition Squat", sets: 5, reps: "5", intensity: 0.75, lift: "squat", tempo: "1.0.1", rest: 180 },
      { name: "Paused Bench", sets: 5, reps: "5", intensity: 0.75, lift: "bench", tempo: "1.1.1", rest: 180 },
      { name: "Overhead Press", sets: 3, reps: "7", intensity: "7 RPE", lift: null, tempo: "1.0.1", rest: 120 },
      { name: "Bent Over Row", sets: 3, reps: "8", intensity: "7 RPE", lift: null, tempo: "1.0.1", rest: 90 },
      { name: "GHR Back Extensions", sets: 5, reps: "10", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 60 },
    ]},
    2: { label: "Deadlift / Bench / Accessories", exercises: [
      { name: "Competition Deadlift", sets: 5, reps: "5", intensity: 0.75, lift: "deadlift", tempo: "1.0.1", rest: 180 },
      { name: "3ct Pause Bench", sets: 3, reps: "3", intensity: 0.70, lift: "bench", tempo: "1.3.1", rest: 180 },
      { name: "SSB or High Bar Pause Squat", sets: 3, reps: "5", intensity: "8 RPE", lift: null, tempo: "1.2.1", rest: 180 },
      { name: "Wide Grip Seated Row", sets: 4, reps: "8", intensity: "8 RPE", lift: null, tempo: "1.1.1", rest: 90 },
    ]},
    3: { label: "Squat / Bench / Accessories", exercises: [
      { name: "Pin Squat (pins at full depth)", sets: 3, reps: "5", intensity: 0.73, lift: "squat", tempo: "1.1.1", rest: 120 },
      { name: "2 Board Press", sets: 3, reps: "6", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 60 },
      { name: "1-Arm DB Rows", sets: 5, reps: "8", intensity: "7.5 RPE", lift: null, tempo: "1.0.1", rest: 90 },
      { name: "Birddogs (reps per side)", sets: 4, reps: "8", intensity: "7 RPE", lift: null, tempo: "1.1.1", rest: 90 },
    ]},
    4: { label: "Deadlift / Bench / Accessories", exercises: [
      { name: "2ct Pause Deadlift (barely off floor)", sets: 3, reps: "5", intensity: 0.73, lift: "deadlift", tempo: "x", rest: 120 },
      { name: "Rep Bench (Touch and Go)", sets: 4, reps: "8", intensity: 0.70, lift: "bench", tempo: "1.0.1", rest: 120 },
      { name: "Stiff-Legged Deadlift", sets: 3, reps: "6", intensity: 0.48, lift: "deadlift", tempo: "1.0.1", rest: 180 },
      { name: "Vertical Pull of choice", sets: 4, reps: "8", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 90 },
      { name: "Tricep movement of choice", sets: 4, reps: "8", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 90 },
    ]},
  },
  5: {
    1: { label: "Squat / Bench / Accessories", exercises: [
      { name: "Competition Squat (heavy)", sets: 3, reps: "3", intensity: 0.80, lift: "squat", tempo: "1.0.1", rest: 180 },
      { name: "Competition Squat (volume)", sets: 2, reps: "5", intensity: 0.68, lift: "squat", tempo: "1.0.1", rest: 180 },
      { name: "Competition Pause Bench (heavy)", sets: 4, reps: "3", intensity: 0.80, lift: "bench", tempo: "1.1.1", rest: 180 },
      { name: "Competition Pause Bench (volume)", sets: 2, reps: "5", intensity: 0.68, lift: "bench", tempo: "1.1.1", rest: 180 },
      { name: "Stiff-Legged Deadlift", sets: 4, reps: "9", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 90 },
      { name: "Side Planks (per side)", sets: 3, reps: "30s", intensity: "hold", lift: null, tempo: "x", rest: 60 },
    ]},
    2: { label: "Deadlift / Bench / Squat", exercises: [
      { name: "Competition Deadlift (heavy)", sets: 3, reps: "3", intensity: 0.80, lift: "deadlift", tempo: "1.0.1", rest: 180 },
      { name: "Competition Deadlift (volume)", sets: 2, reps: "5", intensity: 0.68, lift: "deadlift", tempo: "1.0.1", rest: 180 },
      { name: "2ct Pause Bench", sets: 3, reps: "4", intensity: "8 RPE", lift: null, tempo: "1.2.1", rest: 180 },
      { name: "Competition Squat", sets: 2, reps: "5", intensity: 0.65, lift: "squat", tempo: "1.0.1", rest: 180 },
      { name: "Wide Grip Seated Row", sets: 4, reps: "10", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 60 },
    ]},
    3: { label: "Squat / Bench / Deadlift", exercises: [
      { name: "2ct Pause Squat", sets: 4, reps: "4", intensity: "8 RPE", lift: null, tempo: "1.1.1", rest: 180 },
      { name: "Competition Pause Bench (volume)", sets: 6, reps: "5", intensity: 0.70, lift: "bench", tempo: "1.1.1", rest: 180 },
      { name: "Feet Up Bench", sets: 4, reps: "5", intensity: "8 RPE", lift: null, tempo: "1.1.1", rest: 180 },
      { name: "Competition Deadlift", sets: 2, reps: "5", intensity: 0.65, lift: "deadlift", tempo: "1.0.1", rest: 180 },
      { name: "Vertical Pull of choice", sets: 4, reps: "10", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 90 },
    ]},
    4: { label: "Deadlift / Bench / Accessories", exercises: [
      { name: "2ct Pause Deadlifts (just off floor)", sets: 4, reps: "4", intensity: "8 RPE", lift: null, tempo: "x", rest: 180 },
      { name: "Touch and Go Bench", sets: 3, reps: "6", intensity: "9 RPE", lift: null, tempo: "1.0.1", rest: 180 },
      { name: "Close Grip Incline Press", sets: 4, reps: "8", intensity: "7 RPE", lift: null, tempo: "1.0.1", rest: 120 },
      { name: "1-Arm DB Rows", sets: 6, reps: "10", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 60 },
    ]},
  },
  6: {
    1: { label: "Squat / Bench / Accessories", exercises: [
      { name: "Competition Squat (heavy)", sets: 4, reps: "3", intensity: 0.82, lift: "squat", tempo: "1.0.1", rest: 180 },
      { name: "Competition Squat (volume)", sets: 2, reps: "5", intensity: 0.70, lift: "squat", tempo: "1.0.1", rest: 180 },
      { name: "Competition Pause Bench (heavy)", sets: 5, reps: "3", intensity: 0.82, lift: "bench", tempo: "1.1.1", rest: 180 },
      { name: "Competition Pause Bench (volume)", sets: 3, reps: "5", intensity: 0.70, lift: "bench", tempo: "1.1.1", rest: 180 },
      { name: "Stiff-Legged Deadlift", sets: 4, reps: "8", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 90 },
      { name: "Side Planks (per side)", sets: 4, reps: "30s", intensity: "hold", lift: null, tempo: "x", rest: 60 },
    ]},
    2: { label: "Deadlift / Bench / Squat", exercises: [
      { name: "Competition Deadlift (heavy)", sets: 4, reps: "3", intensity: 0.82, lift: "deadlift", tempo: "1.0.1", rest: 180 },
      { name: "Competition Deadlift (volume)", sets: 2, reps: "5", intensity: 0.70, lift: "deadlift", tempo: "1.0.1", rest: 180 },
      { name: "2ct Pause Bench", sets: 4, reps: "3", intensity: "8 RPE", lift: null, tempo: "1.2.1", rest: 180 },
      { name: "Competition Squat", sets: 3, reps: "5", intensity: 0.68, lift: "squat", tempo: "1.0.1", rest: 180 },
      { name: "Wide Grip Seated Row", sets: 4, reps: "10", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 60 },
    ]},
    3: { label: "Squat / Bench / Deadlift", exercises: [
      { name: "2ct Pause Squat", sets: 5, reps: "3", intensity: "8 RPE", lift: null, tempo: "1.1.1", rest: 180 },
      { name: "Competition Pause Bench (volume)", sets: 6, reps: "4", intensity: 0.73, lift: "bench", tempo: "1.1.1", rest: 180 },
      { name: "Feet Up Bench", sets: 3, reps: "4", intensity: "8 RPE", lift: null, tempo: "1.1.1", rest: 120 },
      { name: "Competition Deadlift", sets: 3, reps: "5", intensity: 0.68, lift: "deadlift", tempo: "1.0.1", rest: 180 },
      { name: "Vertical Pull of choice", sets: 4, reps: "10", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 90 },
    ]},
    4: { label: "Deadlift / Bench / Accessories", exercises: [
      { name: "2ct Pause Deadlifts (just off floor)", sets: 5, reps: "3", intensity: "8 RPE", lift: null, tempo: "x", rest: 180 },
      { name: "Touch and Go Bench", sets: 3, reps: "12", intensity: "10 RPE", lift: null, tempo: "1.0.1", rest: 180 },
      { name: "Close Grip Incline Press", sets: 4, reps: "7", intensity: "7.5 RPE", lift: null, tempo: "1.0.1", rest: 120 },
      { name: "1-Arm DB Rows", sets: 6, reps: "10", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 60 },
    ]},
  },
  7: {
    1: { label: "Squat / Bench / Accessories", exercises: [
      { name: "Competition Squat (heavy)", sets: 5, reps: "2", intensity: 0.86, lift: "squat", tempo: "1.0.1", rest: 180 },
      { name: "Competition Squat (volume)", sets: 2, reps: "4", intensity: 0.72, lift: "squat", tempo: "1.0.1", rest: 180 },
      { name: "Competition Pause Bench (heavy)", sets: 5, reps: "2", intensity: 0.86, lift: "bench", tempo: "1.1.1", rest: 180 },
      { name: "Competition Pause Bench (volume)", sets: 2, reps: "4", intensity: 0.72, lift: "bench", tempo: "1.1.1", rest: 180 },
      { name: "Stiff-Legged Deadlift", sets: 4, reps: "8", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 90 },
      { name: "Side Planks (per side)", sets: 4, reps: "45s", intensity: "hold", lift: null, tempo: "x", rest: 60 },
    ]},
    2: { label: "Deadlift / Bench / Squat", exercises: [
      { name: "Competition Deadlift (heavy)", sets: 5, reps: "2", intensity: 0.86, lift: "deadlift", tempo: "1.0.1", rest: 180 },
      { name: "Competition Deadlift (volume)", sets: 2, reps: "4", intensity: 0.72, lift: "deadlift", tempo: "1.0.1", rest: 180 },
      { name: "2ct Pause Bench", sets: 3, reps: "3", intensity: "8 RPE", lift: null, tempo: "1.2.1", rest: 180 },
      { name: "Competition Squat", sets: 2, reps: "5", intensity: 0.71, lift: "squat", tempo: "1.0.1", rest: 180 },
      { name: "Wide Grip Seated Row", sets: 4, reps: "8", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 60 },
    ]},
    3: { label: "Squat / Bench / Deadlift", exercises: [
      { name: "2ct Pause Squat", sets: 4, reps: "5", intensity: "9 RPE", lift: null, tempo: "1.1.1", rest: 180 },
      { name: "Competition Pause Bench (volume)", sets: 6, reps: "3", intensity: 0.75, lift: "bench", tempo: "1.1.1", rest: 180 },
      { name: "Feet Up Bench", sets: 4, reps: "3", intensity: "8 RPE", lift: null, tempo: "1.1.1", rest: 120 },
      { name: "Competition Deadlift", sets: 2, reps: "5", intensity: 0.71, lift: "deadlift", tempo: "1.0.1", rest: 180 },
      { name: "Vertical Pull of choice", sets: 4, reps: "8", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 90 },
    ]},
    4: { label: "Deadlift / Bench / Accessories", exercises: [
      { name: "2ct Pause Deadlifts (just off floor)", sets: 4, reps: "5", intensity: "8 RPE", lift: null, tempo: "x", rest: 180 },
      { name: "Touch and Go Bench", sets: 4, reps: "7", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 180 },
      { name: "Close Grip Incline Press", sets: 5, reps: "6", intensity: "7 RPE", lift: null, tempo: "1.0.1", rest: 120 },
      { name: "1-Arm DB Rows", sets: 6, reps: "8", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 60 },
    ]},
  },
  8: {
    1: { label: "Squat / Bench / Accessories", exercises: [
      { name: "Competition Squat (heavy)", sets: 4, reps: "3", intensity: 0.85, lift: "squat", tempo: "1.0.1", rest: 180 },
      { name: "Competition Squat (volume)", sets: 3, reps: "4", intensity: 0.75, lift: "squat", tempo: "1.0.1", rest: 180 },
      { name: "Competition Pause Bench (heavy)", sets: 5, reps: "3", intensity: 0.85, lift: "bench", tempo: "1.1.1", rest: 180 },
      { name: "Competition Pause Bench (volume)", sets: 3, reps: "4", intensity: 0.75, lift: "bench", tempo: "1.1.1", rest: 180 },
      { name: "Stiff-Legged Deadlift", sets: 4, reps: "7", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 90 },
      { name: "Side Planks (per side)", sets: 4, reps: "45s", intensity: "hold", lift: null, tempo: "x", rest: 60 },
    ]},
    2: { label: "Deadlift / Bench / Squat", exercises: [
      { name: "Competition Deadlift (heavy)", sets: 4, reps: "3", intensity: 0.85, lift: "deadlift", tempo: "1.0.1", rest: 180 },
      { name: "Competition Deadlift (volume)", sets: 3, reps: "4", intensity: 0.75, lift: "deadlift", tempo: "1.0.1", rest: 180 },
      { name: "2ct Pause Bench", sets: 4, reps: "4", intensity: "8 RPE", lift: null, tempo: "1.2.1", rest: 180 },
      { name: "Competition Squat", sets: 2, reps: "4", intensity: 0.74, lift: "squat", tempo: "1.0.1", rest: 180 },
      { name: "Wide Grip Seated Row", sets: 4, reps: "8", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 60 },
    ]},
    3: { label: "Squat / Bench / Deadlift", exercises: [
      { name: "2ct Pause Squat", sets: 4, reps: "2", intensity: "9 RPE", lift: null, tempo: "1.1.1", rest: 180 },
      { name: "Competition Pause Bench (volume)", sets: 6, reps: "5", intensity: 0.68, lift: "bench", tempo: "1.1.1", rest: 180 },
      { name: "Feet Up Bench", sets: 4, reps: "4", intensity: "8 RPE", lift: null, tempo: "1.1.1", rest: 120 },
      { name: "Competition Deadlift", sets: 2, reps: "4", intensity: 0.74, lift: "deadlift", tempo: "1.0.1", rest: 180 },
      { name: "Vertical Pull of choice", sets: 4, reps: "8", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 90 },
    ]},
    4: { label: "Deadlift / Bench / Accessories", exercises: [
      { name: "2ct Pause Deadlifts (just off floor)", sets: 4, reps: "2", intensity: "9 RPE", lift: null, tempo: "x", rest: 180 },
      { name: "Touch and Go Bench", sets: 4, reps: "5", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 180 },
      { name: "Close Grip Incline Press", sets: 4, reps: "10", intensity: "7.5 RPE", lift: null, tempo: "1.0.1", rest: 120 },
      { name: "1-Arm DB Rows", sets: 6, reps: "8", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 60 },
    ]},
  },
  9: {
    1: { label: "Squat / Bench / Accessories", exercises: [
      { name: "Competition Squat (heavy)", sets: 5, reps: "4", intensity: 0.82, lift: "squat", tempo: "1.0.1", rest: 180 },
      { name: "Competition Squat (volume)", sets: 2, reps: "4", intensity: 0.71, lift: "squat", tempo: "1.0.1", rest: 180 },
      { name: "Competition Pause Bench (heavy)", sets: 6, reps: "4", intensity: 0.82, lift: "bench", tempo: "1.1.1", rest: 180 },
      { name: "Competition Pause Bench (volume)", sets: 2, reps: "4", intensity: 0.71, lift: "bench", tempo: "1.1.1", rest: 180 },
      { name: "Bent Over Row", sets: 4, reps: "8", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 90 },
      { name: "Rolling Planks", sets: 3, reps: "20 total", intensity: "7 RPE", lift: null, tempo: "x", rest: 60 },
    ]},
    2: { label: "Deadlift / Bench / Squat", exercises: [
      { name: "Competition Deadlift (heavy)", sets: 4, reps: "4", intensity: 0.82, lift: "deadlift", tempo: "1.0.1", rest: 180 },
      { name: "Competition Deadlift (volume)", sets: 2, reps: "4", intensity: 0.71, lift: "deadlift", tempo: "1.0.1", rest: 180 },
      { name: "Pin Press (chest level)", sets: 4, reps: "4", intensity: "8 RPE", lift: null, tempo: "1.1.1", rest: 180 },
      { name: "Competition Squat", sets: 3, reps: "5", intensity: 0.68, lift: "squat", tempo: "1.0.1", rest: 180 },
      { name: "Wide Grip Seated Row (cable)", sets: 4, reps: "8", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 60 },
    ]},
    3: { label: "Squat / Bench / Deadlift", exercises: [
      { name: "2ct Pause Squats (top set @ 9 RPE)", sets: 1, reps: "4", intensity: "9 RPE", lift: null, tempo: "1.2.1", rest: 180 },
      { name: "2ct Pause Squats (5% load drop)", sets: 2, reps: "4", intensity: "5% drop", lift: null, tempo: "1.2.1", rest: 180 },
      { name: "Competition Pause Bench", sets: 6, reps: "5", intensity: 0.72, lift: "bench", tempo: "1.1.1", rest: 180 },
      { name: "Close Grip Bench Press", sets: 3, reps: "4", intensity: "8 RPE", lift: null, tempo: "1.1.1", rest: 180 },
      { name: "Competition Deadlift", sets: 2, reps: "5", intensity: 0.68, lift: "deadlift", tempo: "1.0.1", rest: 180 },
      { name: "Vertical Pull of choice", sets: 4, reps: "8", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 90 },
    ]},
    4: { label: "Deadlift / Bench / Accessories", exercises: [
      { name: "2ct Pause Deadlifts (top set @ 9 RPE)", sets: 1, reps: "4", intensity: "9 RPE", lift: null, tempo: "x", rest: 180 },
      { name: "2ct Pause Deadlifts (5% load drop)", sets: 2, reps: "4", intensity: "5% drop", lift: null, tempo: "x", rest: 180 },
      { name: "Bench + mini bands (top set @ 9 RPE)", sets: 1, reps: "8", intensity: "9 RPE", lift: null, tempo: "1.1.1", rest: 180 },
      { name: "Bench + mini bands (5% load drop)", sets: 1, reps: "8", intensity: "5% drop", lift: null, tempo: "1.1.1", rest: 180 },
      { name: "Barbell Overhead Press", sets: 4, reps: "7", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 120 },
      { name: "1-Arm DB Rows", sets: 5, reps: "8", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 60 },
    ]},
  },
  10: {
    1: { label: "Squat / Bench / Accessories", exercises: [
      { name: "Competition Squat (heavy)", sets: 6, reps: "3", intensity: 0.85, lift: "squat", tempo: "1.0.1", rest: 180 },
      { name: "Competition Squat (volume)", sets: 2, reps: "4", intensity: 0.74, lift: "squat", tempo: "1.0.1", rest: 180 },
      { name: "Competition Pause Bench (heavy)", sets: 7, reps: "4", intensity: 0.85, lift: "bench", tempo: "1.1.1", rest: 180 },
      { name: "Competition Pause Bench (volume)", sets: 2, reps: "4", intensity: 0.74, lift: "bench", tempo: "1.1.1", rest: 180 },
      { name: "Bent Over Row", sets: 4, reps: "6", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 90 },
      { name: "Rolling Planks", sets: 4, reps: "20 total", intensity: "7 RPE", lift: null, tempo: "x", rest: 60 },
    ]},
    2: { label: "Deadlift / Bench / Squat", exercises: [
      { name: "Competition Deadlift (heavy)", sets: 5, reps: "3", intensity: 0.85, lift: "deadlift", tempo: "1.0.1", rest: 180 },
      { name: "Competition Deadlift (volume)", sets: 2, reps: "4", intensity: 0.74, lift: "deadlift", tempo: "1.0.1", rest: 180 },
      { name: "Pin Press (chest level)", sets: 4, reps: "5", intensity: "8 RPE", lift: null, tempo: "1.1.1", rest: 180 },
      { name: "Competition Squat", sets: 3, reps: "5", intensity: 0.71, lift: "squat", tempo: "1.0.1", rest: 180 },
      { name: "Wide Grip Seated Row (cable)", sets: 4, reps: "8", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 60 },
    ]},
    3: { label: "Squat / Bench / Deadlift", exercises: [
      { name: "2ct Pause Squats (top set @ 9 RPE)", sets: 1, reps: "2", intensity: "9 RPE", lift: null, tempo: "1.2.1", rest: 180 },
      { name: "2ct Pause Squats (5% load drop)", sets: 3, reps: "2", intensity: "5% drop", lift: null, tempo: "1.2.1", rest: 180 },
      { name: "Competition Pause Bench", sets: 6, reps: "4", intensity: 0.75, lift: "bench", tempo: "1.1.1", rest: 180 },
      { name: "Close Grip Bench (top set @ 9 RPE)", sets: 1, reps: "3", intensity: "9 RPE", lift: null, tempo: "1.1.1", rest: 120 },
      { name: "Close Grip Bench (5% load drop)", sets: 1, reps: "3", intensity: "5% drop", lift: null, tempo: "1.1.1", rest: 120 },
      { name: "Competition Deadlift", sets: 3, reps: "5", intensity: 0.71, lift: "deadlift", tempo: "1.0.1", rest: 180 },
      { name: "Vertical Pull of choice", sets: 4, reps: "8", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 90 },
    ]},
    4: { label: "Deadlift / Bench / Accessories", exercises: [
      { name: "2ct Pause Deadlifts (top set @ 9 RPE)", sets: 1, reps: "2", intensity: "9 RPE", lift: null, tempo: "x", rest: 180 },
      { name: "2ct Pause Deadlifts (5% load drop)", sets: 3, reps: "2", intensity: "5% drop", lift: null, tempo: "x", rest: 180 },
      { name: "Bench + mini bands (top set @ 9 RPE)", sets: 1, reps: "7", intensity: "9 RPE", lift: null, tempo: "1.1.1", rest: 180 },
      { name: "Bench + mini bands (5% load drop)", sets: 1, reps: "7", intensity: "5% drop", lift: null, tempo: "1.1.1", rest: 180 },
      { name: "Barbell Overhead Press", sets: 3, reps: "8", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 120 },
      { name: "1-Arm DB Rows", sets: 5, reps: "8", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 60 },
    ]},
  },
  11: {
    1: { label: "Squat / Bench / Accessories", exercises: [
      { name: "Competition Squat (heavy)", sets: 3, reps: "3", intensity: 0.83, lift: "squat", tempo: "1.0.1", rest: 180 },
      { name: "Competition Squat (volume)", sets: 2, reps: "4", intensity: 0.76, lift: "squat", tempo: "1.0.1", rest: 180 },
      { name: "Competition Pause Bench (heavy)", sets: 3, reps: "3", intensity: 0.83, lift: "bench", tempo: "1.1.1", rest: 180 },
      { name: "Competition Pause Bench (volume)", sets: 2, reps: "4", intensity: 0.76, lift: "bench", tempo: "1.1.1", rest: 180 },
      { name: "Bent Over Row", sets: 4, reps: "5", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 90 },
      { name: "Rolling Planks", sets: 4, reps: "24 total", intensity: "7 RPE", lift: null, tempo: "x", rest: 60 },
    ]},
    2: { label: "Deadlift / Bench / Squat", exercises: [
      { name: "Competition Deadlift (heavy)", sets: 3, reps: "3", intensity: 0.83, lift: "deadlift", tempo: "1.0.1", rest: 180 },
      { name: "Competition Deadlift (volume)", sets: 2, reps: "4", intensity: 0.76, lift: "deadlift", tempo: "1.0.1", rest: 180 },
      { name: "Pin Press (chest level)", sets: 4, reps: "3", intensity: "8 RPE", lift: null, tempo: "1.1.1", rest: 180 },
      { name: "Competition Squat", sets: 3, reps: "4", intensity: 0.74, lift: "squat", tempo: "1.0.1", rest: 180 },
      { name: "Wide Grip Seated Row (cable)", sets: 4, reps: "8", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 60 },
    ]},
    3: { label: "Squat / Bench / Deadlift", exercises: [
      { name: "2ct Pause Squats", sets: 2, reps: "3", intensity: "8 RPE", lift: null, tempo: "1.2.1", rest: 180 },
      { name: "Competition Pause Bench", sets: 5, reps: "3", intensity: 0.78, lift: "bench", tempo: "1.1.1", rest: 180 },
      { name: "Close Grip Bench", sets: 2, reps: "2", intensity: "8 RPE", lift: null, tempo: "1.1.1", rest: 180 },
      { name: "Competition Deadlift", sets: 3, reps: "4", intensity: 0.74, lift: "deadlift", tempo: "1.0.1", rest: 180 },
      { name: "Vertical Pull of choice", sets: 4, reps: "8", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 180 },
    ]},
    4: { label: "Deadlift / Bench / Accessories", exercises: [
      { name: "2ct Pause Deadlifts", sets: 2, reps: "3", intensity: "8 RPE", lift: null, tempo: "x", rest: 180 },
      { name: "Bench + mini bands (top set @ 9 RPE)", sets: 1, reps: "6", intensity: "9 RPE", lift: null, tempo: "1.1.1", rest: 180 },
      { name: "Bench + mini bands (5% load drop)", sets: 1, reps: "6", intensity: "5% drop", lift: null, tempo: "1.1.1", rest: 180 },
      { name: "Barbell Overhead Press", sets: 3, reps: "5", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 180 },
      { name: "1-Arm DB Rows", sets: 5, reps: "8", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 60 },
    ]},
  },
  12: {
    1: { label: "Squat / Bench / Accessories", exercises: [
      { name: "Competition Squat (top set @ 8 RPE)", sets: 1, reps: "3", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 180 },
      { name: "Competition Squat (% TM)", sets: 6, reps: "5", intensity: 0.65, lift: "squat", tempo: "1.0.1", rest: 180 },
      { name: "Competition Pause Bench (top set @ 8 RPE)", sets: 1, reps: "3", intensity: "8 RPE", lift: null, tempo: "1.1.1", rest: 180 },
      { name: "Competition Pause Bench (% TM)", sets: 7, reps: "5", intensity: 0.65, lift: "bench", tempo: "1.1.1", rest: 180 },
      { name: "Overhead Press (top @ 9 RPE)", sets: 1, reps: "6", intensity: "9 RPE", lift: null, tempo: "1.0.1", rest: 120 },
      { name: "Overhead Press (5% load drop)", sets: 1, reps: "6", intensity: "5% drop", lift: null, tempo: "1.0.1", rest: 120 },
    ]},
    2: { label: "Deadlift / Bench / Squat", exercises: [
      { name: "Competition Deadlift (top set @ 8 RPE)", sets: 1, reps: "3", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 180 },
      { name: "Competition Deadlift (% TM)", sets: 6, reps: "5", intensity: 0.65, lift: "deadlift", tempo: "1.0.1", rest: 180 },
      { name: "2ct Pause Bench (top @ 9 RPE)", sets: 1, reps: "4", intensity: "9 RPE", lift: null, tempo: "1.2.1", rest: 180 },
      { name: "2ct Pause Bench (5% load drop)", sets: 2, reps: "4", intensity: "5% drop", lift: null, tempo: "1.2.1", rest: 180 },
      { name: "High Bar Squat", sets: 3, reps: "4", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 180 },
    ]},
    3: { label: "Squat / Bench Variations", exercises: [
      { name: "Pin Squat (8 RPE)", sets: 1, reps: "3", intensity: "8 RPE", lift: null, tempo: "1.1.1", rest: 180 },
      { name: "Pin Squat (9 RPE)", sets: 1, reps: "4", intensity: "9 RPE", lift: null, tempo: "1.1.1", rest: 180 },
      { name: "Pin Squat (5% load drop)", sets: 1, reps: "4", intensity: "5% drop", lift: null, tempo: "1.1.1", rest: 180 },
      { name: "Close Grip Bench (9 RPE)", sets: 1, reps: "3", intensity: "9 RPE", lift: null, tempo: "1.1.1", rest: 180 },
      { name: "Close Grip Bench (5% load drop)", sets: 2, reps: "3", intensity: "5% drop", lift: null, tempo: "1.1.1", rest: 180 },
      { name: "Feet Up Bench (top @ 9 RPE)", sets: 1, reps: "5", intensity: "9 RPE", lift: null, tempo: "1.1.1", rest: 180 },
      { name: "Feet Up Bench (5% load drop)", sets: 1, reps: "5", intensity: "5% drop", lift: null, tempo: "1.1.1", rest: 180 },
    ]},
    4: { label: "Deadlift / Bench Variations", exercises: [
      { name: "2ct Pause Deadlift (8 RPE)", sets: 1, reps: "3", intensity: "8 RPE", lift: null, tempo: "x", rest: 180 },
      { name: "2ct Pause Deadlift (9 RPE)", sets: 1, reps: "5", intensity: "9 RPE", lift: null, tempo: "x", rest: 180 },
      { name: "2ct Pause Deadlift (5% load drop)", sets: 1, reps: "5", intensity: "5% drop", lift: null, tempo: "x", rest: 180 },
      { name: "Touch and Go Bench", sets: 4, reps: "5", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 180 },
    ]},
  },
  13: {
    1: { label: "Squat / Bench / Accessories", exercises: [
      { name: "Competition Squat (top set @ 8 RPE)", sets: 1, reps: "2", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 180 },
      { name: "Competition Squat (% TM)", sets: 6, reps: "5", intensity: 0.68, lift: "squat", tempo: "1.0.1", rest: 180 },
      { name: "Competition Pause Bench (top set @ 8 RPE)", sets: 1, reps: "2", intensity: "8 RPE", lift: null, tempo: "1.1.1", rest: 180 },
      { name: "Competition Pause Bench (% TM)", sets: 7, reps: "5", intensity: 0.68, lift: "bench", tempo: "1.1.1", rest: 180 },
      { name: "Overhead Press (top @ 9 RPE)", sets: 1, reps: "7", intensity: "9 RPE", lift: null, tempo: "1.0.1", rest: 90 },
      { name: "Overhead Press (5% load drop)", sets: 1, reps: "7", intensity: "5% drop", lift: null, tempo: "1.0.1", rest: 90 },
    ]},
    2: { label: "Deadlift / Bench / Squat", exercises: [
      { name: "Competition Deadlift (top set @ 8 RPE)", sets: 1, reps: "2", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 180 },
      { name: "Competition Deadlift (% TM)", sets: 6, reps: "5", intensity: 0.68, lift: "deadlift", tempo: "1.0.1", rest: 180 },
      { name: "2ct Pause Bench", sets: 3, reps: "5", intensity: "8 RPE", lift: null, tempo: "1.2.1", rest: 180 },
      { name: "High Bar Squat (top @ 9 RPE)", sets: 1, reps: "3", intensity: "9 RPE", lift: null, tempo: "1.0.1", rest: 180 },
      { name: "High Bar Squat (5% load drop)", sets: 1, reps: "3", intensity: "5% drop", lift: null, tempo: "1.0.1", rest: 180 },
    ]},
    3: { label: "Squat / Bench Variations", exercises: [
      { name: "Pin Squat (8 RPE)", sets: 1, reps: "2", intensity: "8 RPE", lift: null, tempo: "1.1.1", rest: 180 },
      { name: "Pin Squat (9 RPE)", sets: 1, reps: "5", intensity: "9 RPE", lift: null, tempo: "1.1.1", rest: 180 },
      { name: "Pin Squat (5% load drop)", sets: 1, reps: "5", intensity: "5% drop", lift: null, tempo: "1.1.1", rest: 180 },
      { name: "Close Grip Bench (9 RPE)", sets: 1, reps: "2", intensity: "9 RPE", lift: null, tempo: "1.1.1", rest: 180 },
      { name: "Close Grip Bench (5% load drop)", sets: 1, reps: "2", intensity: "5% drop", lift: null, tempo: "1.1.1", rest: 180 },
      { name: "Feet Up Bench (top @ 9 RPE)", sets: 1, reps: "6", intensity: "9 RPE", lift: null, tempo: "1.1.1", rest: 180 },
      { name: "Feet Up Bench (5% load drop)", sets: 1, reps: "6", intensity: "5% drop", lift: null, tempo: "1.1.1", rest: 180 },
    ]},
    4: { label: "Deadlift / Bench Variations", exercises: [
      { name: "2ct Pause Deadlift (8 RPE)", sets: 1, reps: "2", intensity: "8 RPE", lift: null, tempo: "x", rest: 180 },
      { name: "2ct Pause Deadlift (8 RPE × 3 sets)", sets: 3, reps: "4", intensity: "8 RPE", lift: null, tempo: "x", rest: 180 },
      { name: "Touch and Go Bench", sets: 4, reps: "4", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 180 },
    ]},
  },
  14: {
    1: { label: "Squat / Bench / Accessories", exercises: [
      { name: "Competition Squat (top set @ 8 RPE)", sets: 1, reps: "1", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 180 },
      { name: "Competition Squat (% TM)", sets: 4, reps: "4", intensity: 0.72, lift: "squat", tempo: "1.0.1", rest: 180 },
      { name: "Competition Pause Bench (top set @ 9 RPE)", sets: 1, reps: "1", intensity: "9 RPE", lift: null, tempo: "1.1.1", rest: 180 },
      { name: "Competition Pause Bench (% TM)", sets: 5, reps: "4", intensity: 0.72, lift: "bench", tempo: "1.1.1", rest: 180 },
      { name: "Overhead Press", sets: 3, reps: "6", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 120 },
    ]},
    2: { label: "Deadlift / Bench / Squat", exercises: [
      { name: "Competition Deadlift (top set @ 8 RPE)", sets: 1, reps: "1", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 180 },
      { name: "Competition Deadlift (% TM)", sets: 4, reps: "4", intensity: 0.72, lift: "deadlift", tempo: "1.0.1", rest: 180 },
      { name: "2ct Pause Bench (top @ 9 RPE)", sets: 1, reps: "2", intensity: "9 RPE", lift: null, tempo: "1.2.1", rest: 180 },
      { name: "2ct Pause Bench (5% load drop)", sets: 2, reps: "2", intensity: "5% drop", lift: null, tempo: "1.2.1", rest: 180 },
      { name: "High Bar Squat (top @ 9 RPE)", sets: 1, reps: "4", intensity: "9 RPE", lift: null, tempo: "1.0.1", rest: 180 },
      { name: "High Bar Squat (5% load drop)", sets: 2, reps: "4", intensity: "5% drop", lift: null, tempo: "1.0.1", rest: 180 },
    ]},
    3: { label: "Squat / Bench Variations", exercises: [
      { name: "Pin Squat (8 RPE)", sets: 1, reps: "1", intensity: "8 RPE", lift: null, tempo: "1.1.1", rest: 180 },
      { name: "Pin Squat (9 RPE)", sets: 1, reps: "2", intensity: "9 RPE", lift: null, tempo: "1.1.1", rest: 180 },
      { name: "Pin Squat (5% load drop)", sets: 1, reps: "2", intensity: "5% drop", lift: null, tempo: "1.1.1", rest: 180 },
      { name: "Close Grip Bench", sets: 3, reps: "3", intensity: "8 RPE", lift: null, tempo: "1.1.1", rest: 180 },
      { name: "Feet Up Bench (top @ 9 RPE)", sets: 1, reps: "3", intensity: "9 RPE", lift: null, tempo: "1.1.1", rest: 180 },
      { name: "Feet Up Bench (5% load drop)", sets: 1, reps: "3", intensity: "5% drop", lift: null, tempo: "1.1.1", rest: 180 },
    ]},
    4: { label: "Deadlift / Bench Variations", exercises: [
      { name: "2ct Pause Deadlift (8 RPE)", sets: 1, reps: "1", intensity: "8 RPE", lift: null, tempo: "x", rest: 180 },
      { name: "2ct Pause Deadlift (9 RPE)", sets: 1, reps: "2", intensity: "9 RPE", lift: null, tempo: "x", rest: 180 },
      { name: "2ct Pause Deadlift (5% load drop)", sets: 2, reps: "2", intensity: "5% drop", lift: null, tempo: "x", rest: 180 },
      { name: "Touch and Go Bench (top @ 9 RPE)", sets: 1, reps: "3", intensity: "9 RPE", lift: null, tempo: "1.0.1", rest: 180 },
      { name: "Touch and Go Bench (5% load drop)", sets: 1, reps: "3", intensity: "5% drop", lift: null, tempo: "1.0.1", rest: 180 },
    ]},
  },
  15: {
    1: { label: "Squat / Bench / Accessories", exercises: [
      { name: "Competition Squat (top set @ 8 RPE)", sets: 1, reps: "1", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 180 },
      { name: "Competition Squat (% TM)", sets: 3, reps: "3", intensity: 0.76, lift: "squat", tempo: "1.0.1", rest: 180 },
      { name: "Competition Pause Bench (top set @ 9 RPE)", sets: 1, reps: "1", intensity: "9 RPE", lift: null, tempo: "1.1.1", rest: 180 },
      { name: "Competition Pause Bench (% TM)", sets: 4, reps: "3", intensity: 0.76, lift: "bench", tempo: "1.1.1", rest: 180 },
      { name: "Overhead Press (top @ 9 RPE)", sets: 1, reps: "5", intensity: "9 RPE", lift: null, tempo: "1.0.1", rest: 90 },
      { name: "Overhead Press (5% load drop)", sets: 1, reps: "5", intensity: "5% drop", lift: null, tempo: "1.0.1", rest: 90 },
    ]},
    2: { label: "Deadlift / Bench / Squat", exercises: [
      { name: "Competition Deadlift (top set @ 8 RPE)", sets: 1, reps: "1", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 180 },
      { name: "Competition Deadlift (% TM)", sets: 3, reps: "3", intensity: 0.76, lift: "deadlift", tempo: "1.0.1", rest: 180 },
      { name: "2ct Pause Bench", sets: 3, reps: "4", intensity: "8 RPE", lift: null, tempo: "1.2.1", rest: 180 },
      { name: "High Bar Squat", sets: 2, reps: "2", intensity: "8 RPE", lift: null, tempo: "1.0.1", rest: 180 },
    ]},
    3: { label: "Squat / Bench Variations", exercises: [
      { name: "Pin Squat (8 RPE)", sets: 1, reps: "1", intensity: "8 RPE", lift: null, tempo: "1.1.1", rest: 180 },
      { name: "Pin Squat (9 RPE)", sets: 1, reps: "4", intensity: "9 RPE", lift: null, tempo: "1.1.1", rest: 180 },
      { name: "Pin Squat (5% load drop)", sets: 2, reps: "4", intensity: "5% drop", lift: null, tempo: "1.1.1", rest: 180 },
      { name: "Close Grip Bench (top @ 9 RPE)", sets: 1, reps: "4", intensity: "9 RPE", lift: null, tempo: "1.1.1", rest: 180 },
      { name: "Close Grip Bench (5% load drop)", sets: 1, reps: "4", intensity: "5% drop", lift: null, tempo: "1.1.1", rest: 180 },
      { name: "Feet Up Bench (top @ 9 RPE)", sets: 1, reps: "4", intensity: "9 RPE", lift: null, tempo: "1.1.1", rest: 180 },
      { name: "Feet Up Bench (5% load drop)", sets: 1, reps: "4", intensity: "5% drop", lift: null, tempo: "1.1.1", rest: 180 },
    ]},
    4: { label: "Deadlift / Bench Variations", exercises: [
      { name: "2ct Pause Deadlift (8 RPE)", sets: 1, reps: "1", intensity: "8 RPE", lift: null, tempo: "x", rest: 180 },
      { name: "2ct Pause Deadlift (9 RPE)", sets: 1, reps: "4", intensity: "9 RPE", lift: null, tempo: "x", rest: 180 },
      { name: "2ct Pause Deadlift (5% load drop)", sets: 2, reps: "4", intensity: "5% drop", lift: null, tempo: "x", rest: 180 },
      { name: "Touch and Go Bench (top @ 9 RPE)", sets: 1, reps: "3", intensity: "9 RPE", lift: null, tempo: "1.0.1", rest: 180 },
      { name: "Touch and Go Bench (5% load drop)", sets: 2, reps: "3", intensity: "5% drop", lift: null, tempo: "1.0.1", rest: 180 },
    ]},
  },
  16: {
    1: { label: "5 Days Out — Squat / Bench Opener", exercises: [
      { name: "Competition Squat (opener)", sets: 1, reps: "1", intensity: "Opener", lift: null, tempo: "1.0.1", rest: 180 },
      { name: "Competition Squat", sets: 3, reps: "2", intensity: 0.82, lift: "squat", tempo: "1.0.1", rest: 180 },
      { name: "Competition Pause Bench (opener)", sets: 1, reps: "1", intensity: "Opener", lift: null, tempo: "1.1.1", rest: 180 },
      { name: "Competition Pause Bench", sets: 3, reps: "2", intensity: 0.84, lift: "bench", tempo: "1.1.1", rest: 180 },
    ]},
    2: { label: "4 Days Out — Deadlift / Bench", exercises: [
      { name: "Competition Deadlift (opener)", sets: 1, reps: "1", intensity: "Opener", lift: null, tempo: "1.0.1", rest: 180 },
      { name: "Competition Deadlift", sets: 2, reps: "2", intensity: 0.82, lift: "deadlift", tempo: "1.0.1", rest: 180 },
      { name: "Competition Pause Bench", sets: 4, reps: "1", intensity: 0.85, lift: "bench", tempo: "1.1.1", rest: 180 },
    ]},
    3: { label: "3 Days Out — Full Opener Day", exercises: [
      { name: "Competition Squat", sets: 1, reps: "1", intensity: 0.85, lift: "squat", tempo: "1.0.1", rest: 180 },
      { name: "Competition Squat (back-off)", sets: 2, reps: "2", intensity: 0.78, lift: "squat", tempo: "1.0.1", rest: 180 },
      { name: "Competition Pause Bench", sets: 1, reps: "1", intensity: 0.85, lift: "bench", tempo: "1.1.1", rest: 180 },
      { name: "Competition Pause Bench (back-off)", sets: 3, reps: "2", intensity: 0.78, lift: "bench", tempo: "1.1.1", rest: 180 },
      { name: "Competition Deadlift", sets: 1, reps: "1", intensity: 0.82, lift: "deadlift", tempo: "1.0.1", rest: 180 },
      { name: "Competition Deadlift (back-off)", sets: 2, reps: "2", intensity: 0.75, lift: "deadlift", tempo: "1.0.1", rest: 180 },
    ]},
    4: { label: "2 Days Out — Final Tune-Up", exercises: [
      { name: "Competition Squat", sets: 2, reps: "3", intensity: 0.75, lift: "squat", tempo: "1.0.1", rest: 180 },
      { name: "Competition Pause Bench", sets: 3, reps: "3", intensity: 0.78, lift: "bench", tempo: "1.1.1", rest: 180 },
      { name: "Competition Deadlift", sets: 1, reps: "3", intensity: 0.75, lift: "deadlift", tempo: "1.0.1", rest: 180 },
    ]},
  },
};

// ─── RPE → %1RM TABLE (Epley-style, commonly used in powerlifting) ───────────
// rpeTable[reps][rpe] = estimated % of 1RM
const RPE_TABLE = {
  1:  { 6: 0.783, 6.5: 0.800, 7: 0.817, 7.5: 0.833, 8: 0.850, 8.5: 0.867, 9: 0.883, 9.5: 0.900, 10: 0.917 },
  2:  { 6: 0.750, 6.5: 0.767, 7: 0.783, 7.5: 0.800, 8: 0.817, 8.5: 0.833, 9: 0.850, 9.5: 0.867, 10: 0.883 },
  3:  { 6: 0.717, 6.5: 0.733, 7: 0.750, 7.5: 0.767, 8: 0.783, 8.5: 0.800, 9: 0.817, 9.5: 0.833, 10: 0.850 },
  4:  { 6: 0.683, 6.5: 0.700, 7: 0.717, 7.5: 0.733, 8: 0.750, 8.5: 0.767, 9: 0.783, 9.5: 0.800, 10: 0.817 },
  5:  { 6: 0.650, 6.5: 0.667, 7: 0.683, 7.5: 0.700, 8: 0.717, 8.5: 0.733, 9: 0.750, 9.5: 0.767, 10: 0.783 },
  6:  { 6: 0.617, 6.5: 0.633, 7: 0.650, 7.5: 0.667, 8: 0.683, 8.5: 0.700, 9: 0.717, 9.5: 0.733, 10: 0.750 },
  7:  { 6: 0.583, 6.5: 0.600, 7: 0.617, 7.5: 0.633, 8: 0.650, 8.5: 0.667, 9: 0.683, 9.5: 0.700, 10: 0.717 },
  8:  { 6: 0.550, 6.5: 0.567, 7: 0.583, 7.5: 0.600, 8: 0.617, 8.5: 0.633, 9: 0.650, 9.5: 0.667, 10: 0.683 },
  9:  { 6: 0.517, 6.5: 0.533, 7: 0.550, 7.5: 0.567, 8: 0.583, 8.5: 0.600, 9: 0.617, 9.5: 0.633, 10: 0.650 },
  10: { 6: 0.483, 6.5: 0.500, 7: 0.517, 7.5: 0.533, 8: 0.550, 8.5: 0.567, 9: 0.583, 9.5: 0.600, 10: 0.617 },
  12: { 6: 0.450, 6.5: 0.467, 7: 0.483, 7.5: 0.500, 8: 0.517, 8.5: 0.533, 9: 0.550, 9.5: 0.567, 10: 0.583 },
};

const PHASES = {
  "1-4":   { label: "ACCUMULATION",     color: "#60a5fa" },
  "5-8":   { label: "INTENSIFICATION",  color: "#fb923c" },
  "9-11":  { label: "PEAKING",          color: "#f472b6" },
  "12-15": { label: "COMP PREP",        color: "#a78bfa" },
  "taper": { label: "TAPER",            color: "#4ade80" },
};

function getPhase(w) {
  if (w <= 4) return "1-4";
  if (w <= 8) return "5-8";
  if (w <= 11) return "9-11";
  if (w <= 15) return "12-15";
  return "taper";
}

function snap(val, to5) {
  const m = to5 ? 5 : 2.5;
  return Math.round(val / m) * m;
}

function calcWeight(intensity, lift, maxes, to5) {
  if (typeof intensity !== "number") return null;
  const tm = parseFloat(maxes[lift]);
  if (!tm || isNaN(tm) || tm <= 0) return null;
  return snap(tm * intensity, to5);
}

function fmtRest(r) {
  if (!r || r === "x") return null;
  const s = parseInt(r);
  if (isNaN(s)) return null;
  return s >= 60 ? `${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}` : `${s}s`;
}

// Estimate 1RM from weight + reps + RPE
function estimate1RM(weight, reps, rpe) {
  const row = RPE_TABLE[reps] || RPE_TABLE[Math.min(12, Math.max(1, reps))];
  if (!row) return null;
  const pct = row[rpe];
  if (!pct) return null;
  return Math.round(weight / pct);
}

// Given a 1RM, what weight for target reps @ target RPE?
function weightForRPE(oneRM, reps, rpe) {
  const row = RPE_TABLE[reps] || RPE_TABLE[Math.min(12, Math.max(1, reps))];
  if (!row) return null;
  const pct = row[rpe];
  if (!pct) return null;
  return Math.round(oneRM * pct);
}

// ─── STYLES ─────────────────────────────────────────────────────────────────
const C = {
  bg: "#0e0e14",
  surface: "#16161f",
  border: "rgba(255,255,255,0.08)",
  text: "#e8e4da",
  muted: "rgba(232,228,218,0.38)",
  dim: "rgba(232,228,218,0.2)",
  accent: "#4ade80",
  orange: "#fb923c",
  blue: "#60a5fa",
  red: "#f87171",
  purple: "#a78bfa",
};

// Defined outside component so it is stable across renders
function Label({ children }) {
  return <div style={{ fontSize:10, color:C.muted, letterSpacing:"0.14em", marginBottom:8 }}>{children}</div>;
}

const BODY_MEASUREMENTS = [
  "waist","neck","shoulder","chest",
  "leftBicep","rightBicep","leftForearm","rightForearm",
  "abdomen","hips","leftThigh","rightThigh","leftCalf","rightCalf",
];
const MEAS_LABELS = {
  waist:"Waist", neck:"Neck", shoulder:"Shoulder", chest:"Chest",
  leftBicep:"Left Bicep", rightBicep:"Right Bicep",
  leftForearm:"Left Forearm", rightForearm:"Right Forearm",
  abdomen:"Abdomen", hips:"Hips",
  leftThigh:"Left Thigh", rightThigh:"Right Thigh",
  leftCalf:"Left Calf", rightCalf:"Right Calf",
};

function fmtStopwatch(sec) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  if (h > 0) return `${h}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
  return `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
}

function calcDayVolume(w, d, weightsMap, doneMap, prog) {
  const exs = prog[w]?.[d]?.exercises || [];
  let vol = 0;
  exs.forEach((ex, ei) => {
    const setCount = parseInt(ex.sets) || 0;
    const wUsed = parseFloat(weightsMap[`${w}-${d}-${ei}`]) || 0;
    const reps = parseInt(ex.reps) || 0;
    for (let si = 0; si < setCount; si++) {
      if (doneMap[`${w}-${d}-${ei}-${si}`] && wUsed > 0) {
        vol += wUsed * reps;
      }
    }
  });
  return vol;
}

function calcWeekVolume(w, weightsMap, doneMap, prog) {
  return [1,2,3,4].reduce((sum, d) => sum + calcDayVolume(w, d, weightsMap, doneMap, prog), 0);
}

function calcTotalVolume(weightsMap, doneMap, prog) {
  let total = 0;
  for (let w = 1; w <= 16; w++) {
    total += calcWeekVolume(w, weightsMap, doneMap, prog);
  }
  return total;
}

function fmtVol(v) {
  if (v >= 1000000) return `${(v/1000000).toFixed(2)}M`;
  if (v >= 1000) return `${(v/1000).toFixed(1)}k`;
  return String(v);
}

// ─── HELPERS: completion checks ─────────────────────────────────────────────
function isDayComplete(w, d, doneMap) {
  const exs = PROGRAM[w]?.[d]?.exercises || [];
  if (exs.length === 0) return false;
  for (let ei = 0; ei < exs.length; ei++) {
    const setCount = parseInt(exs[ei].sets) || 0;
    for (let si = 0; si < setCount; si++) {
      if (!doneMap[`${w}-${d}-${ei}-${si}`]) return false;
    }
  }
  return true;
}

function isWeekComplete(w, doneMap) {
  return [1,2,3,4].every(d => isDayComplete(w, d, doneMap));
}

// ─── MAIN APP ───────────────────────────────────────────────────────────────
export default function App() {
  const [week, setWeek]   = useState(1);
  const [day, setDay]     = useState(1);
  const [tab, setTab]     = useState("workout");

  // ── Persisted training data ──
  const [maxes, setMaxes]       = useState(() => { try { return JSON.parse(localStorage.getItem("cb_maxes")||"{}"); } catch { return {}; } });
  const [to5, setTo5]           = useState(() => { try { return JSON.parse(localStorage.getItem("cb_to5")??"true"); } catch { return true; } });
  const [done, setDone]         = useState(() => { try { return JSON.parse(localStorage.getItem("cb_done")||"{}"); } catch { return {}; } });
  const [weights, setWeights]   = useState(() => { try { return JSON.parse(localStorage.getItem("cb_weights")||"{}"); } catch { return {}; } });
  const [notes, setNotes]       = useState(() => { try { return JSON.parse(localStorage.getItem("cb_notes")||"{}"); } catch { return {}; } });
  const [rpeLogged, setRpeLogged] = useState(() => { try { return JSON.parse(localStorage.getItem("cb_rpe_logged")||"{}"); } catch { return {}; } });
  const [workoutLog, setWorkoutLog] = useState(() => { try { return JSON.parse(localStorage.getItem("cb_workout_log")||"[]"); } catch { return []; } });
  const [compDate, setCompDate] = useState(() => localStorage.getItem("cb_comp_date") || "");
  const [bodyWeight, setBodyWeight] = useState(() => { try { return JSON.parse(localStorage.getItem("cb_body_weight")||"[]"); } catch { return []; } });
  const [measurements, setMeasurements] = useState(() => { try { return JSON.parse(localStorage.getItem("cb_measurements")||"[]"); } catch { return []; } });

  const [maxInp, setMaxInp] = useState({ squat: "", bench: "", deadlift: "" });
  const [confirmReset, setConfirmReset] = useState(false);

  // ── Stopwatch ──
  const [swRunning, setSwRunning]   = useState(false);
  const [swSeconds, setSwSeconds]   = useState(0);
  const [swPaused, setSwPaused]     = useState(false);  // true = workout started but paused
  const swRef = useRef(null);

  // ── Rest timer ──
  const [timerSec, setTimerSec]     = useState(null);
  const [timerTotal, setTimerTotal] = useState(0);
  const timerRef = useRef(null);

  // ── RPE calculator ──
  const [rpeWeight, setRpeWeight] = useState("");
  const [rpeReps, setRpeReps]     = useState("5");
  const [rpeRPE, setRpeRPE]       = useState("8");
  const [rpeMode, setRpeMode]     = useState("calc1rm");
  const [fwOneRM, setFwOneRM]     = useState("");
  const [fwReps, setFwReps]       = useState("5");
  const [fwRPE, setFwRPE]         = useState("8");

  // ── Body / Metrics inputs ──
  const [bwInput, setBwInput]       = useState("");
  const [measInput, setMeasInput]   = useState({});
  const [measDate, setMeasDate]     = useState(() => new Date().toISOString().slice(0,10));
  const [compDateInput, setCompDateInput] = useState(compDate);
  const [calView, setCalView]       = useState("log"); // "log" | "comp"

  // ── Persist everything ──
  useEffect(() => { try { localStorage.setItem("cb_maxes", JSON.stringify(maxes)); } catch {} }, [maxes]);
  useEffect(() => { try { localStorage.setItem("cb_to5", JSON.stringify(to5)); } catch {} }, [to5]);
  useEffect(() => { try { localStorage.setItem("cb_done", JSON.stringify(done)); } catch {} }, [done]);
  useEffect(() => { try { localStorage.setItem("cb_weights", JSON.stringify(weights)); } catch {} }, [weights]);
  useEffect(() => { try { localStorage.setItem("cb_notes", JSON.stringify(notes)); } catch {} }, [notes]);
  useEffect(() => { try { localStorage.setItem("cb_rpe_logged", JSON.stringify(rpeLogged)); } catch {} }, [rpeLogged]);
  useEffect(() => { try { localStorage.setItem("cb_workout_log", JSON.stringify(workoutLog)); } catch {} }, [workoutLog]);
  useEffect(() => { try { localStorage.setItem("cb_comp_date", compDate); } catch { /* quota exceeded */ } }, [compDate]);
  useEffect(() => { try { localStorage.setItem("cb_body_weight", JSON.stringify(bodyWeight)); } catch {} }, [bodyWeight]);
  useEffect(() => { try { localStorage.setItem("cb_measurements", JSON.stringify(measurements)); } catch {} }, [measurements]);
  useEffect(() => { setMaxInp({ squat: maxes.squat||"", bench: maxes.bench||"", deadlift: maxes.deadlift||"" }); }, [maxes]);

  // ── Stopwatch logic ──
  useEffect(() => {
    if (swRunning) {
      swRef.current = setInterval(() => setSwSeconds(s => s + 1), 1000);
    } else {
      clearInterval(swRef.current);
    }
    return () => clearInterval(swRef.current);
  }, [swRunning]);

  function startWorkout() { setSwSeconds(0); setSwRunning(true); setSwPaused(false); }
  function pauseWorkout()  { setSwRunning(false); setSwPaused(true); }
  function resumeWorkout() { setSwRunning(true); setSwPaused(false); }

  function saveWorkout() {
    const entry = {
      id: Date.now(),
      date: new Date().toISOString().slice(0,10),
      week, day,
      label: PROGRAM[week]?.[day]?.label || "",
      duration: swSeconds,
      volume: calcDayVolume(week, day, weights, done, PROGRAM),
    };
    setWorkoutLog(p => [entry, ...p]);
    setSwRunning(false); setSwSeconds(0); setSwPaused(false);
  }

  function stopWorkout() { setSwRunning(false); setSwSeconds(0); setSwPaused(false); }

  // ── Rest timer ──
  function startTimer(seconds) {
    clearInterval(timerRef.current);
    setTimerTotal(seconds); setTimerSec(seconds);
    timerRef.current = setInterval(() => {
      setTimerSec(prev => { if (prev <= 1) { clearInterval(timerRef.current); return 0; } return prev - 1; });
    }, 1000);
  }
  function dismissTimer() { clearInterval(timerRef.current); setTimerSec(null); }
  useEffect(() => () => { clearInterval(timerRef.current); clearInterval(swRef.current); }, []);

  // ── Session data ──
  const session   = PROGRAM[week]?.[day];
  const exs       = session?.exercises || [];
  const totalSets = exs.reduce((a, e) => a + (parseInt(e.sets)||0), 0);
  const doneSets  = exs.reduce((total, ex, ei) => {
    const sc = parseInt(ex.sets)||0;
    for (let si = 0; si < sc; si++) { if (done[`${week}-${day}-${ei}-${si}`]) total++; }
    return total;
  }, 0);

  const hasMaxes          = ["squat","bench","deadlift"].some(l => parseFloat(maxes[l]) > 0);
  const phase             = getPhase(week);
  const currentDayComplete  = isDayComplete(week, day, done);
  const currentWeekComplete = isWeekComplete(week, done);

  // ── Memoized volume (only recalculates when weights or done changes) ──
  const dayVol   = useMemo(() => calcDayVolume(week, day, weights, done, PROGRAM),   [week, day, weights, done]);
  const weekVol  = useMemo(() => calcWeekVolume(week, weights, done, PROGRAM),        [week, weights, done]);
  const totalVol = useMemo(() => calcTotalVolume(weights, done, PROGRAM),             [weights, done]);

  // ── Memoized competition countdown ──
  const countdown = useMemo(() => {
    if (!compDate) return null;
    const now = new Date();
    const comp = new Date(compDate);
    const diffMs = comp - now;
    if (diffMs < 0) return { past: true };
    const totalDays = Math.floor(diffMs / 86400000);
    return { weeks: Math.floor(totalDays / 7), days: totalDays % 7, totalDays };
  }, [compDate]);

  // ── Helpers ──
  function toggleSet(ei, si) {
    const k = `${week}-${day}-${ei}-${si}`;
    const was = done[k];
    setDone(p => ({ ...p, [k]: !p[k] }));
    if (!was) { const r = parseInt(exs[ei]?.rest)||0; if (r > 0) startTimer(r); }
  }
  function setExWeight(ei, val) { setWeights(p => ({ ...p, [`${week}-${day}-${ei}`]: val })); }
  function getExWeight(ei)      { return weights[`${week}-${day}-${ei}`] || ""; }
  function setExNote(ei, val)   { setNotes(p => ({ ...p, [`${week}-${day}-${ei}`]: val })); }
  function getExNote(ei)        { return notes[`${week}-${day}-${ei}`] || ""; }
  function setExRpe(ei, val)    { setRpeLogged(p => ({ ...p, [`${week}-${day}-${ei}`]: val })); }
  function getExRpe(ei)         { return rpeLogged[`${week}-${day}-${ei}`] ?? null; }

  function saveMaxes() {
    const m = {};
    ["squat","bench","deadlift"].forEach(l => {
      const v = parseFloat(maxInp[l]);
      // Sanity bounds: must be between 1 and 2000 lbs
      if (!isNaN(v) && v > 0 && v <= 2000) m[l] = v;
    });
    setMaxes(m); setTab("workout");
  }

  function quickCompleteDay() {
    const u = {};
    exs.forEach((ex, ei) => { const sc = parseInt(ex.sets)||0; for (let si = 0; si < sc; si++) u[`${week}-${day}-${ei}-${si}`] = true; });
    setDone(p => ({ ...p, ...u }));
  }

  function resetAllData() {
    setDone({}); setWeights({}); setNotes({}); setRpeLogged({}); setWorkoutLog([]);
    setBodyWeight([]); setMeasurements([]);
    ["cb_done","cb_weights","cb_notes","cb_rpe_logged","cb_workout_log","cb_body_weight","cb_measurements"].forEach(k => localStorage.removeItem(k));
    setConfirmReset(false); setWeek(1); setDay(1);
    setSwRunning(false); setSwSeconds(0); setSwPaused(false);
  }

  function saveBodyWeight() {
    const v = parseFloat(bwInput);
    // Sanity bounds: must be between 50 and 1500 lbs
    if (isNaN(v) || v < 50 || v > 1500) return;
    setBodyWeight(p => [{ date: measDate, value: v }, ...p]);
    setBwInput("");
  }

  function saveMeasurements() {
    const hasAny = BODY_MEASUREMENTS.some(k => measInput[k] && parseFloat(measInput[k]) > 0);
    if (!hasAny) return;
    const entry = { date: measDate, ...measInput };
    setMeasurements(p => [entry, ...p]);
    setMeasInput({});
  }

  // ── RPE calc ──
  const calc1rmResult = (() => {
    const w = parseFloat(rpeWeight), r = parseInt(rpeReps), rpe = parseFloat(rpeRPE);
    if (!w||!r||!rpe) return null;
    return estimate1RM(w, r, rpe);
  })();
  const findWeightResult = (() => {
    const orm = parseFloat(fwOneRM), r = parseInt(fwReps), rpe = parseFloat(fwRPE);
    if (!orm||!r||!rpe) return null;
    return weightForRPE(orm, r, rpe);
  })();

  function rpeColor(r) {
    if (r === null) return C.muted;
    if (r <= 6)  return C.blue;
    if (r <= 7)  return C.accent;
    if (r <= 8)  return C.orange;
    if (r <= 9)  return C.red;
    return "#ef4444";
  }
  const RPE_VALUES = [5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10];

  return (
    <div style={{ minHeight:"100vh", background:C.bg, color:C.text, fontFamily:"'DM Mono','Courier New',monospace" }}>
      <div style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none",
        backgroundImage:`linear-gradient(${C.border} 1px,transparent 1px),linear-gradient(90deg,${C.border} 1px,transparent 1px)`,
        backgroundSize:"48px 48px", opacity:0.4 }} />

      <div style={{ position:"relative", zIndex:1, maxWidth:540, margin:"0 auto", padding:"0 16px 100px" }}>

        {/* ── REST TIMER PILL ── */}
        {timerSec !== null && (
          <div style={{ position:"fixed", bottom:24, right:20, zIndex:100,
            display:"flex", alignItems:"center", gap:10,
            background: timerSec===0 ? `${C.accent}22` : C.surface,
            border:`1px solid ${timerSec===0 ? C.accent : C.border}`,
            borderRadius:40, padding:"8px 14px 8px 10px",
            boxShadow:"0 4px 20px rgba(0,0,0,0.4)", transition:"background 0.3s,border-color 0.3s" }}>
            <svg width="32" height="32" style={{ flexShrink:0 }}>
              <circle cx="16" cy="16" r="13" fill="none" stroke={C.border} strokeWidth="2.5"/>
              <circle cx="16" cy="16" r="13" fill="none"
                stroke={timerSec===0 ? C.accent : C.muted} strokeWidth="2.5"
                strokeDasharray={`${2*Math.PI*13}`}
                strokeDashoffset={`${2*Math.PI*13*(timerSec/(timerTotal||1))}`}
                strokeLinecap="round" transform="rotate(-90 16 16)"
                style={{ transition:"stroke-dashoffset 0.9s linear,stroke 0.3s" }}/>
              <text x="16" y="20" textAnchor="middle"
                style={{ fontSize:9, fontFamily:"inherit", fontWeight:700,
                  fill: timerSec===0 ? C.accent : C.muted }}>
                {timerSec===0 ? "GO" : timerSec>=60 ? `${Math.floor(timerSec/60)}:${String(timerSec%60).padStart(2,"0")}` : timerSec}
              </text>
            </svg>
            <div>
              <div style={{ fontSize:11, color:timerSec===0?C.accent:C.muted, fontWeight:700, lineHeight:1 }}>
                {timerSec===0?"REST DONE":"REST"}
              </div>
              {timerSec>0 && <div style={{ fontSize:10, color:C.dim, marginTop:2 }}>
                {timerSec>=60?`${Math.floor(timerSec/60)}:${String(timerSec%60).padStart(2,"0")}`:`${timerSec}s`}
              </div>}
            </div>
            <button onClick={dismissTimer} style={{ background:"transparent", border:"none",
              color:C.dim, fontSize:16, cursor:"pointer", padding:"0 0 0 4px", lineHeight:1 }}>×</button>
          </div>
        )}

        {/* ── HEADER ── */}
        <div style={{ paddingTop:32, paddingBottom:16, borderBottom:`1px solid ${C.border}` }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
            <div>
              <div style={{ fontSize:9, letterSpacing:"0.2em", color:PHASES[phase].color, fontWeight:700, marginBottom:4 }}>
                CALGARY BARBELL · 16 WEEK
              </div>
              <h1 style={{ margin:0, fontSize:24, fontWeight:700, letterSpacing:"-0.02em" }}>TRAINING LOG</h1>
              {hasMaxes && (
                <div style={{ display:"flex", gap:14, marginTop:6 }}>
                  {["squat","bench","deadlift"].map(l => maxes[l] ? (
                    <span key={l} style={{ fontSize:10, color:C.muted }}>
                      <span style={{ color:C.accent, fontWeight:700 }}>{l[0].toUpperCase()}</span> {maxes[l]}
                    </span>
                  ) : null)}
                </div>
              )}
            </div>
            {/* Stopwatch */}
            <div style={{ textAlign:"right" }}>
              {!swRunning && !swPaused ? (
                <button onClick={startWorkout} style={{
                  background:`${C.accent}18`, border:`1px solid ${C.accent}50`,
                  color:C.accent, padding:"10px 14px", borderRadius:10,
                  fontSize:11, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
                  ▶ START
                </button>
              ) : (
                <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:6 }}>
                  <div style={{ fontSize:22, fontWeight:700, color: swRunning ? C.accent : C.orange,
                    letterSpacing:"-0.02em", fontVariantNumeric:"tabular-nums" }}>
                    {fmtStopwatch(swSeconds)}
                  </div>
                  <div style={{ display:"flex", gap:6 }}>
                    {swRunning ? (
                      <button onClick={pauseWorkout} style={{
                        background:`${C.orange}18`, border:`1px solid ${C.orange}50`,
                        color:C.orange, padding:"7px 12px", borderRadius:8,
                        fontSize:10, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>⏸ PAUSE</button>
                    ) : (<>
                      <button onClick={resumeWorkout} style={{
                        background:`${C.accent}18`, border:`1px solid ${C.accent}50`,
                        color:C.accent, padding:"7px 10px", borderRadius:8,
                        fontSize:10, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>▶ RESUME</button>
                      <button onClick={saveWorkout} style={{
                        background:`${C.blue}18`, border:`1px solid ${C.blue}50`,
                        color:C.blue, padding:"7px 10px", borderRadius:8,
                        fontSize:10, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>💾 SAVE</button>
                      <button onClick={stopWorkout} style={{
                        background:`${C.red}18`, border:`1px solid ${C.red}50`,
                        color:C.red, padding:"7px 10px", borderRadius:8,
                        fontSize:10, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>✕ STOP</button>
                    </>)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── NAV TABS ── */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:6, paddingTop:14, paddingBottom:4 }}>
          {[["workout","📋"],["maxes","⚡"],["rpe","🧮"],["calendar","📅"],["metrics","📊"]].map(([t,icon]) => (
            <button key={t} onClick={() => setTab(t)} style={{
              background: tab===t ? C.accent : C.surface,
              border:`2px solid ${tab===t ? C.accent : C.border}`,
              color: tab===t ? "#0e0e14" : C.muted,
              borderRadius:10, padding:"12px 0", fontSize:10, fontWeight:700,
              cursor:"pointer", fontFamily:"inherit", transition:"all 0.15s",
            }}>{icon}<div style={{ fontSize:8, marginTop:2, letterSpacing:"0.05em" }}>{t.toUpperCase()}</div></button>
          ))}
        </div>

        {/* ══════════════════════════════════════
            TAB: WORKOUT
        ══════════════════════════════════════ */}
        {tab==="workout" && (<>

          {/* Week picker */}
          <div style={{ paddingTop:20 }}>
            <div style={{ fontSize:10, color:C.accent, letterSpacing:"0.2em", fontWeight:700, marginBottom:10 }}>WEEK</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(8,1fr)", gap:6 }}>
              {Array.from({length:16},(_,i)=>i+1).map(w => {
                const c = PHASES[getPhase(w)].color;
                const sel = w===week;
                const wc = isWeekComplete(w, done);
                return (
                  <button key={w} onClick={() => setWeek(w)} style={{
                    border:`2px solid ${wc||sel ? c : C.border}`,
                    background: wc ? `${c}28` : sel ? `${c}20` : C.surface,
                    color: sel||wc ? c : C.muted,
                    borderRadius:8, padding:"10px 0 4px", fontSize:13, fontWeight:700,
                    cursor:"pointer", fontFamily:"inherit", transition:"all 0.12s", lineHeight:1.2,
                  }}>
                    {w}
                    <div style={{ fontSize:9, height:12, color:wc?c:"transparent" }}>✓</div>
                  </button>
                );
              })}
            </div>
            <div style={{ marginTop:8, fontSize:9, color:C.dim, letterSpacing:"0.12em" }}>
              {PHASES[phase].label} · WK {phase==="taper"?"16":phase.replace("-","–")}
            </div>
          </div>

          {/* Day picker */}
          <div style={{ paddingTop:16, paddingBottom:16, borderBottom:`1px solid ${C.border}` }}>
            <div style={{ fontSize:10, color:C.accent, letterSpacing:"0.2em", fontWeight:700, marginBottom:10 }}>DAY</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8 }}>
              {[1,2,3,4].map(d => {
                const s = PROGRAM[week]?.[d];
                const sub = s?.label?.split(" / ")[0]||"";
                const sel = d===day;
                const dc = isDayComplete(week, d, done);
                return (
                  <button key={d} onClick={() => setDay(d)} style={{
                    border:`2px solid ${sel?C.accent:dc?C.accent:C.border}`,
                    background: dc?`${C.accent}22`:sel?`${C.accent}18`:C.surface,
                    color: sel?C.accent:dc?C.accent:C.muted,
                    borderRadius:10, padding:"14px 8px 10px", fontSize:11, fontWeight:700,
                    cursor:"pointer", fontFamily:"inherit", textAlign:"center",
                    transition:"all 0.12s", lineHeight:1.4,
                  }}>
                    <div style={{ fontSize:18, marginBottom:2 }}>{dc?"✓":`DAY ${d}`}</div>
                    <div style={{ fontSize:dc?11:9, color:sel?`${C.accent}90`:dc?`${C.accent}80`:C.dim, fontWeight:dc?700:400 }}>
                      {dc?`DAY ${d}`:(sub.length>14?sub.slice(0,13)+"…":sub)}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Volume summary row */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, paddingTop:14, paddingBottom:4 }}>
            {[["TODAY",fmtVol(dayVol)+"lbs"],["WEEK "+week,fmtVol(weekVol)+"lbs"],["TOTAL",fmtVol(totalVol)+"lbs"]].map(([label,val])=>(
              <div key={label} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:8, padding:"10px 12px" }}>
                <div style={{ fontSize:8, color:C.dim, letterSpacing:"0.14em", marginBottom:3 }}>{label} VOL</div>
                <div style={{ fontSize:14, fontWeight:700, color: dayVol>0?C.accent:C.muted }}>{val}</div>
              </div>
            ))}
          </div>

          {/* Session header */}
          <div style={{ paddingTop:16, marginBottom:14 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:4 }}>
              <div style={{ fontSize:10, color:C.muted, letterSpacing:"0.16em" }}>WEEK {week} · DAY {day}</div>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap", justifyContent:"flex-end" }}>
                {totalSets>0 && !currentDayComplete && (
                  <button onClick={quickCompleteDay} style={{
                    background:`${C.accent}18`, border:`1px solid ${C.accent}50`,
                    color:C.accent, padding:"6px 12px", borderRadius:8,
                    fontSize:11, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>⚡ QUICK COMPLETE</button>
                )}
                {!confirmReset ? (
                  <button onClick={() => setConfirmReset(true)} style={{
                    background:"transparent", border:`1px solid ${C.red}30`,
                    color:`${C.red}80`, padding:"6px 10px", borderRadius:8,
                    fontSize:11, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>↺ RESET</button>
                ) : (
                  <div style={{ display:"flex", gap:6, alignItems:"center" }}>
                    <span style={{ fontSize:10, color:`${C.red}90` }}>Sure?</span>
                    <button onClick={resetAllData} style={{
                      background:`${C.red}15`, border:`1px solid ${C.red}50`,
                      color:C.red, padding:"6px 10px", borderRadius:8,
                      fontSize:11, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>YES</button>
                    <button onClick={() => setConfirmReset(false)} style={{
                      background:C.surface, border:`1px solid ${C.border}`,
                      color:C.muted, padding:"6px 10px", borderRadius:8,
                      fontSize:11, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>NO</button>
                  </div>
                )}
              </div>
            </div>
            <div style={{ fontSize:18, fontWeight:700, color:C.text, marginBottom: totalSets>0?12:0 }}>
              {session?.label||"Rest Day"}
            </div>
            {totalSets>0 && !currentDayComplete && (
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ flex:1, height:4, background:C.surface, borderRadius:2, overflow:"hidden", border:`1px solid ${C.border}` }}>
                  <div style={{ height:"100%", background:C.accent, borderRadius:2, width:`${(doneSets/totalSets)*100}%`, transition:"width 0.3s" }}/>
                </div>
                <span style={{ fontSize:10, color:C.muted, whiteSpace:"nowrap" }}>{doneSets}/{totalSets}</span>
              </div>
            )}
            {currentDayComplete && (
              <div style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 14px",
                background:`${C.accent}15`, border:`1px solid ${C.accent}50`, borderRadius:8 }}>
                <span style={{ fontSize:18 }}>✅</span>
                <div>
                  <div style={{ fontSize:13, fontWeight:700, color:C.accent }}>Day {day} Complete!</div>
                  {currentWeekComplete && <div style={{ fontSize:11, color:`${C.accent}80`, marginTop:2 }}>🏆 Week {week} fully done!</div>}
                </div>
              </div>
            )}
          </div>

          {/* Exercise cards */}
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {exs.map((ex, ei) => {
              const isPct   = typeof ex.intensity==="number";
              const progW   = isPct&&ex.lift ? calcWeight(ex.intensity,ex.lift,maxes,to5) : null;
              const intStr  = isPct ? `${Math.round(ex.intensity*100)}%` : String(ex.intensity);
              const isRPE   = typeof ex.intensity==="string"&&ex.intensity.toLowerCase().includes("rpe");
              const setCount = parseInt(ex.sets)||0;
              const rest    = fmtRest(ex.rest);
              const loggedW = getExWeight(ei);
              const loggedRpe = getExRpe(ei);

              return (
                <div key={ei} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, padding:"16px" }}>
                  <div style={{ fontWeight:700, fontSize:14, color:C.text, lineHeight:1.3, marginBottom:8 }}>{ex.name}</div>

                  {/* Stats */}
                  <div style={{ display:"flex", flexWrap:"wrap", gap:"6px 14px", alignItems:"center", marginBottom:12 }}>
                    <span style={{ fontSize:13, color:C.muted, fontWeight:700 }}>{ex.sets} × {ex.reps}</span>
                    <span style={{ fontSize:13, fontWeight:700, color:isRPE?C.orange:isPct?C.muted:C.dim }}>{intStr}</span>
                    {progW!==null && (
                      <span style={{ fontSize:14, fontWeight:700, color:C.accent,
                        background:`${C.accent}18`, padding:"3px 10px", borderRadius:6, border:`1px solid ${C.accent}40` }}>
                        {progW} lbs
                      </span>
                    )}
                    {ex.tempo&&ex.tempo!=="x"&&<span style={{ fontSize:10, color:C.dim }}>tempo {ex.tempo}</span>}
                    {rest&&<span style={{ fontSize:10, color:C.dim }}>{rest} rest</span>}
                  </div>

                  {/* Weight used */}
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
                    <div style={{ fontSize:10, color:C.dim, letterSpacing:"0.12em", whiteSpace:"nowrap" }}>WEIGHT USED</div>
                    <input type="number" placeholder={progW?`${progW}`:"lbs"} value={loggedW}
                      onChange={e => setExWeight(ei, e.target.value)}
                      style={{ flex:1, background:C.bg,
                        border:`1px solid ${loggedW?C.accent+"60":C.border}`,
                        color:loggedW?C.accent:C.muted, padding:"9px 12px", borderRadius:8,
                        fontSize:15, fontWeight:700, fontFamily:"inherit", outline:"none", maxWidth:120 }}/>
                    {loggedW&&progW&&(
                      <span style={{ fontSize:11, color:parseFloat(loggedW)>=progW?C.accent:C.orange }}>
                        {parseFloat(loggedW)>=progW?"✓ on target":`${progW-parseFloat(loggedW)} lbs short`}
                      </span>
                    )}
                  </div>

                  {/* Perceived RPE */}
                  <div style={{ marginBottom:12 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
                      <div style={{ fontSize:10, color:C.dim, letterSpacing:"0.12em" }}>PERCEIVED RPE</div>
                      {loggedRpe!==null&&(
                        <div style={{ fontSize:12, fontWeight:700, color:rpeColor(loggedRpe),
                          background:`${rpeColor(loggedRpe)}18`, border:`1px solid ${rpeColor(loggedRpe)}50`,
                          padding:"2px 9px", borderRadius:20 }}>
                          {loggedRpe} RPE
                        </div>
                      )}
                    </div>
                    <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
                      {RPE_VALUES.map(r => {
                        const sel = loggedRpe===r;
                        const col = rpeColor(r);
                        return (
                          <button key={r} onClick={() => setExRpe(ei, sel?null:r)} style={{
                            padding:"7px 0", width:42, borderRadius:8, fontSize:12, fontWeight:700,
                            cursor:"pointer", fontFamily:"inherit", transition:"all 0.12s",
                            border:`2px solid ${sel?col:C.border}`,
                            background:sel?`${col}22`:C.bg,
                            color:sel?col:C.dim,
                          }}>{r%1===0?r:r.toFixed(1)}</button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Set buttons */}
                  {setCount>0&&(
                    <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:12 }}>
                      {Array.from({length:setCount},(_,si)=>{
                        const k=`${week}-${day}-${ei}-${si}`;
                        const chk=done[k];
                        return (
                          <button key={si} onClick={()=>toggleSet(ei,si)} style={{
                            width:48, height:48, borderRadius:10,
                            border:`2px solid ${chk?C.accent:C.border}`,
                            background:chk?`${C.accent}20`:C.bg,
                            color:chk?C.accent:C.muted,
                            fontSize:chk?18:14, fontWeight:700,
                            cursor:"pointer", fontFamily:"inherit", transition:"all 0.12s",
                          }}>{chk?"✓":si+1}</button>
                        );
                      })}
                    </div>
                  )}

                  {/* Notes */}
                  <textarea placeholder="Notes…" value={getExNote(ei)}
                    onChange={e => setExNote(ei, e.target.value)}
                    rows={getExNote(ei)?undefined:1}
                    style={{ width:"100%", boxSizing:"border-box",
                      background:getExNote(ei)?`${C.blue}0a`:"transparent",
                      border:`1px solid ${getExNote(ei)?C.blue+"50":C.border}`,
                      color:C.muted, padding:"9px 12px", borderRadius:8,
                      fontSize:13, fontFamily:"inherit", outline:"none",
                      resize:"vertical", lineHeight:1.5, minHeight:38 }}/>
                </div>
              );
            })}
          </div>

          {!hasMaxes&&exs.some(e=>typeof e.intensity==="number")&&(
            <div style={{ marginTop:16, padding:"14px 16px", background:`${C.accent}08`,
              border:`1px dashed ${C.accent}40`, borderRadius:10,
              display:"flex", justifyContent:"space-between", alignItems:"center", gap:12 }}>
              <div style={{ fontSize:12, color:C.muted }}>Add training maxes to see target weights</div>
              <button onClick={()=>setTab("maxes")} style={{
                background:`${C.accent}20`, border:`1px solid ${C.accent}50`, color:C.accent,
                padding:"10px 16px", borderRadius:8, fontSize:11, fontWeight:700,
                cursor:"pointer", fontFamily:"inherit" }}>SET NOW</button>
            </div>
          )}
        </>)}

        {/* ══════════════════════════════════════
            TAB: MAXES
        ══════════════════════════════════════ */}
        {tab==="maxes"&&(
          <div style={{ paddingTop:24 }}>
            <div style={{ fontSize:12, color:C.accent, letterSpacing:"0.16em", fontWeight:700, marginBottom:6 }}>TRAINING MAXES</div>
            <p style={{ fontSize:12, color:C.muted, margin:"0 0 24px", lineHeight:1.7 }}>
              Enter your training maxes. All percentage-based sets auto-calculate target weights.
            </p>
            {["squat","bench","deadlift"].map(l=>(
              <div key={l} style={{ marginBottom:18 }}>
                <Label>{l.toUpperCase()} TM</Label>
                <input type="number" placeholder={l==="bench"?"225":l==="squat"?"315":"405"}
                  value={maxInp[l]} onChange={e=>setMaxInp(p=>({...p,[l]:e.target.value}))}
                  style={{ width:"100%", boxSizing:"border-box", background:C.bg,
                    border:`2px solid ${maxInp[l]?C.accent+"60":C.border}`,
                    color:C.text, padding:"16px 18px", borderRadius:10,
                    fontSize:22, fontWeight:700, fontFamily:"inherit", outline:"none" }}/>
                {maxes[l]&&<div style={{ fontSize:11, color:`${C.accent}80`, marginTop:5 }}>Current: {maxes[l]}</div>}
              </div>
            ))}
            <div style={{ marginBottom:24, padding:"16px", background:C.surface, border:`1px solid ${C.border}`, borderRadius:10 }}>
              <Label>WEIGHT ROUNDING</Label>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                {[{label:"Round to 5 lbs",val:true},{label:"Round to 2.5 kg",val:false}].map(o=>(
                  <button key={o.label} onClick={()=>setTo5(o.val)} style={{
                    padding:"14px 0", borderRadius:10, fontSize:13, fontWeight:700,
                    cursor:"pointer", fontFamily:"inherit",
                    border:`2px solid ${to5===o.val?C.accent:C.border}`,
                    background:to5===o.val?`${C.accent}18`:C.bg,
                    color:to5===o.val?C.accent:C.muted }}>{o.label}</button>
                ))}
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 2fr", gap:10 }}>
              <button onClick={()=>setTab("workout")} style={{
                padding:"16px 0", background:C.surface, border:`2px solid ${C.border}`,
                color:C.muted, borderRadius:10, fontSize:13, fontWeight:700,
                cursor:"pointer", fontFamily:"inherit" }}>CANCEL</button>
              <button onClick={saveMaxes} style={{
                padding:"16px 0", background:C.accent, border:"none", color:C.bg,
                borderRadius:10, fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>SAVE MAXES</button>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════
            TAB: RPE CALCULATOR
        ══════════════════════════════════════ */}
        {tab==="rpe"&&(
          <div style={{ paddingTop:24 }}>
            <div style={{ fontSize:12, color:C.accent, letterSpacing:"0.16em", fontWeight:700, marginBottom:4 }}>RPE CALCULATOR</div>
            <p style={{ fontSize:12, color:C.muted, margin:"0 0 20px", lineHeight:1.7 }}>Estimate your 1RM or find a target weight.</p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:24 }}>
              {[["calc1rm","📊 Estimate 1RM"],["findweight","🎯 Find Weight"]].map(([m,label])=>(
                <button key={m} onClick={()=>setRpeMode(m)} style={{
                  padding:"14px 0", borderRadius:10, fontSize:13, fontWeight:700,
                  cursor:"pointer", fontFamily:"inherit",
                  border:`2px solid ${rpeMode===m?C.orange:C.border}`,
                  background:rpeMode===m?`${C.orange}18`:C.surface,
                  color:rpeMode===m?C.orange:C.muted }}>{label}</button>
              ))}
            </div>
            {rpeMode==="calc1rm"&&(<>
              <div style={{ display:"flex", flexDirection:"column", gap:16, marginBottom:20 }}>
                <div><Label>WEIGHT LIFTED (lbs)</Label>
                  <input type="number" placeholder="e.g. 315" value={rpeWeight} onChange={e=>setRpeWeight(e.target.value)}
                    style={{ width:"100%", boxSizing:"border-box", background:C.bg,
                      border:`2px solid ${rpeWeight?C.orange+"60":C.border}`,
                      color:C.text, padding:"16px 18px", borderRadius:10,
                      fontSize:22, fontWeight:700, fontFamily:"inherit", outline:"none" }}/>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                  <div><Label>REPS COMPLETED</Label>
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:6 }}>
                      {[1,2,3,4,5,6,7,8,9,10,12].map(r=>(
                        <button key={r} onClick={()=>setRpeReps(String(r))} style={{
                          padding:"12px 0", borderRadius:8, fontSize:13, fontWeight:700,
                          cursor:"pointer", fontFamily:"inherit",
                          border:`2px solid ${rpeReps===String(r)?C.orange:C.border}`,
                          background:rpeReps===String(r)?`${C.orange}18`:C.surface,
                          color:rpeReps===String(r)?C.orange:C.muted }}>{r}</button>
                      ))}
                    </div>
                  </div>
                  <div><Label>RPE</Label>
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:6 }}>
                      {[6,6.5,7,7.5,8,8.5,9,9.5,10].map(r=>(
                        <button key={r} onClick={()=>setRpeRPE(String(r))} style={{
                          padding:"12px 0", borderRadius:8, fontSize:12, fontWeight:700,
                          cursor:"pointer", fontFamily:"inherit",
                          border:`2px solid ${rpeRPE===String(r)?C.orange:C.border}`,
                          background:rpeRPE===String(r)?`${C.orange}18`:C.surface,
                          color:rpeRPE===String(r)?C.orange:C.muted }}>{r}</button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {calc1rmResult&&(
                <div style={{ padding:"22px 20px", background:`${C.orange}12`,
                  border:`2px solid ${C.orange}50`, borderRadius:12, textAlign:"center", marginBottom:20 }}>
                  <div style={{ fontSize:11, color:`${C.orange}90`, letterSpacing:"0.16em", marginBottom:6 }}>ESTIMATED 1RM</div>
                  <div style={{ fontSize:44, fontWeight:700, color:C.orange }}>
                    {calc1rmResult} <span style={{ fontSize:20 }}>lbs</span>
                  </div>
                  <div style={{ marginTop:16, display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
                    {[["90%",0.90],["85%",0.85],["80%",0.80],["75%",0.75],["70%",0.70],["65%",0.65]].map(([lbl,pct])=>(
                      <div key={lbl} style={{ padding:"10px 6px", background:C.surface, borderRadius:8, border:`1px solid ${C.border}` }}>
                        <div style={{ fontSize:10, color:C.muted, marginBottom:3 }}>{lbl}</div>
                        <div style={{ fontSize:15, fontWeight:700, color:C.text }}>{snap(calc1rmResult*pct,to5)} lbs</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>)}
            {rpeMode==="findweight"&&(<>
              <div style={{ display:"flex", flexDirection:"column", gap:16, marginBottom:20 }}>
                <div><Label>YOUR 1RM (lbs)</Label>
                  <input type="number" placeholder="e.g. 400" value={fwOneRM} onChange={e=>setFwOneRM(e.target.value)}
                    style={{ width:"100%", boxSizing:"border-box", background:C.bg,
                      border:`2px solid ${fwOneRM?C.blue+"60":C.border}`,
                      color:C.text, padding:"16px 18px", borderRadius:10,
                      fontSize:22, fontWeight:700, fontFamily:"inherit", outline:"none" }}/>
                  {hasMaxes&&(
                    <div style={{ display:"flex", gap:8, marginTop:8, flexWrap:"wrap" }}>
                      {["squat","bench","deadlift"].map(l=>maxes[l]?(
                        <button key={l} onClick={()=>setFwOneRM(String(maxes[l]))} style={{
                          background:C.surface, border:`1px solid ${C.border}`, color:C.muted,
                          padding:"7px 12px", borderRadius:7, fontSize:11, fontWeight:700,
                          cursor:"pointer", fontFamily:"inherit" }}>Use {l} TM ({maxes[l]})</button>
                      ):null)}
                    </div>
                  )}
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                  <div><Label>TARGET REPS</Label>
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:6 }}>
                      {[1,2,3,4,5,6,7,8,9,10,12].map(r=>(
                        <button key={r} onClick={()=>setFwReps(String(r))} style={{
                          padding:"12px 0", borderRadius:8, fontSize:13, fontWeight:700,
                          cursor:"pointer", fontFamily:"inherit",
                          border:`2px solid ${fwReps===String(r)?C.blue:C.border}`,
                          background:fwReps===String(r)?`${C.blue}18`:C.surface,
                          color:fwReps===String(r)?C.blue:C.muted }}>{r}</button>
                      ))}
                    </div>
                  </div>
                  <div><Label>TARGET RPE</Label>
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:6 }}>
                      {[6,6.5,7,7.5,8,8.5,9,9.5,10].map(r=>(
                        <button key={r} onClick={()=>setFwRPE(String(r))} style={{
                          padding:"12px 0", borderRadius:8, fontSize:12, fontWeight:700,
                          cursor:"pointer", fontFamily:"inherit",
                          border:`2px solid ${fwRPE===String(r)?C.blue:C.border}`,
                          background:fwRPE===String(r)?`${C.blue}18`:C.surface,
                          color:fwRPE===String(r)?C.blue:C.muted }}>{r}</button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {findWeightResult&&(
                <div style={{ padding:"22px 20px", background:`${C.blue}12`,
                  border:`2px solid ${C.blue}50`, borderRadius:12, textAlign:"center" }}>
                  <div style={{ fontSize:11, color:`${C.blue}90`, letterSpacing:"0.16em", marginBottom:6 }}>USE THIS WEIGHT</div>
                  <div style={{ fontSize:44, fontWeight:700, color:C.blue }}>
                    {snap(findWeightResult,to5)} <span style={{ fontSize:20 }}>lbs</span>
                  </div>
                  <div style={{ fontSize:12, color:C.muted, marginTop:6 }}>
                    {fwReps} reps @ RPE {fwRPE} = {Math.round((snap(findWeightResult,to5)/parseFloat(fwOneRM))*100)}% of 1RM
                  </div>
                </div>
              )}
            </>)}
            <div style={{ marginTop:24, padding:"16px", background:C.surface, border:`1px solid ${C.border}`, borderRadius:12 }}>
              <div style={{ fontSize:10, color:C.orange, letterSpacing:"0.14em", marginBottom:12, fontWeight:700 }}>RPE REFERENCE</div>
              {[["6 RPE","4+ reps left — very easy"],["7 RPE","3 reps left — moderate"],
                ["8 RPE","2 reps left — challenging"],["9 RPE","1 rep left — very hard"],
                ["10 RPE","Max effort — nothing left"]].map(([rpe,desc])=>(
                <div key={rpe} style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
                  padding:"8px 0", borderBottom:`1px solid ${C.border}` }}>
                  <span style={{ color:C.orange, fontWeight:700, fontSize:13 }}>{rpe}</span>
                  <span style={{ color:C.muted, fontSize:12 }}>{desc}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════
            TAB: CALENDAR
        ══════════════════════════════════════ */}
        {tab==="calendar"&&(
          <div style={{ paddingTop:24 }}>
            <div style={{ fontSize:12, color:C.accent, letterSpacing:"0.16em", fontWeight:700, marginBottom:16 }}>CALENDAR</div>

            {/* Sub-nav */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:20 }}>
              {[["log","📋 Workout Log"],["comp","🏆 Competition"]].map(([v,label])=>(
                <button key={v} onClick={()=>setCalView(v)} style={{
                  padding:"13px 0", borderRadius:10, fontSize:12, fontWeight:700,
                  cursor:"pointer", fontFamily:"inherit",
                  border:`2px solid ${calView===v?C.accent:C.border}`,
                  background:calView===v?`${C.accent}18`:C.surface,
                  color:calView===v?C.accent:C.muted }}>{label}</button>
              ))}
            </div>

            {calView==="log"&&(<>
              {workoutLog.length===0 ? (
                <div style={{ textAlign:"center", padding:"40px 20px", color:C.muted, fontSize:13 }}>
                  No saved workouts yet.<br/>Start a workout and hit 💾 SAVE to log it.
                </div>
              ) : workoutLog.map(entry=>(
                <div key={entry.id} style={{ background:C.surface, border:`1px solid ${C.border}`,
                  borderRadius:10, padding:"14px 16px", marginBottom:10 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                    <div>
                      <div style={{ fontSize:12, color:C.accent, fontWeight:700, marginBottom:2 }}>
                        WK {entry.week} · DAY {entry.day}
                      </div>
                      <div style={{ fontSize:13, color:C.text, fontWeight:700, marginBottom:4 }}>{entry.label}</div>
                      <div style={{ fontSize:11, color:C.muted }}>{entry.date}</div>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ fontSize:11, color:C.muted, marginBottom:3 }}>⏱ {fmtStopwatch(entry.duration)}</div>
                      <div style={{ fontSize:11, color:entry.volume>0?C.accent:C.muted }}>
                        {entry.volume>0?`${fmtVol(entry.volume)} lbs vol`:"—"}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>)}

            {calView==="comp"&&(
              <div>
                {/* Countdown display */}
                {countdown && !countdown.past && (
                  <div style={{ padding:"22px 20px", background:`${C.purple}12`,
                    border:`2px solid ${C.purple}50`, borderRadius:12, textAlign:"center", marginBottom:20 }}>
                    <div style={{ fontSize:10, color:`${C.purple}90`, letterSpacing:"0.16em", marginBottom:8 }}>COMPETITION COUNTDOWN</div>
                    <div style={{ display:"flex", justifyContent:"center", gap:24 }}>
                      <div>
                        <div style={{ fontSize:44, fontWeight:700, color:C.purple, lineHeight:1 }}>{countdown.weeks}</div>
                        <div style={{ fontSize:10, color:C.muted, marginTop:4 }}>WEEKS</div>
                      </div>
                      <div style={{ fontSize:36, color:C.muted, lineHeight:1.3 }}>+</div>
                      <div>
                        <div style={{ fontSize:44, fontWeight:700, color:C.purple, lineHeight:1 }}>{countdown.days}</div>
                        <div style={{ fontSize:10, color:C.muted, marginTop:4 }}>DAYS</div>
                      </div>
                    </div>
                    <div style={{ fontSize:11, color:C.muted, marginTop:10 }}>{compDate}</div>
                  </div>
                )}
                {countdown?.past && (
                  <div style={{ padding:"16px", background:`${C.red}10`, border:`1px solid ${C.red}40`,
                    borderRadius:10, textAlign:"center", marginBottom:20, color:C.red, fontSize:13, fontWeight:700 }}>
                    🏆 Competition date has passed!
                  </div>
                )}

                <Label>SET COMPETITION DATE</Label>
                <input type="date" value={compDateInput}
                  onChange={e=>setCompDateInput(e.target.value)}
                  style={{ width:"100%", boxSizing:"border-box", background:C.bg,
                    border:`2px solid ${compDateInput?C.purple+"60":C.border}`,
                    color:C.text, padding:"14px 16px", borderRadius:10,
                    fontSize:16, fontWeight:700, fontFamily:"inherit", outline:"none",
                    marginBottom:12, colorScheme:"dark" }}/>
                <button onClick={()=>setCompDate(compDateInput)} style={{
                  width:"100%", padding:"14px 0", background:C.purple, border:"none", color:C.bg,
                  borderRadius:10, fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
                  SAVE DATE
                </button>
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════
            TAB: METRICS
        ══════════════════════════════════════ */}
        {tab==="metrics"&&(
          <div style={{ paddingTop:24 }}>
            <div style={{ fontSize:12, color:C.accent, letterSpacing:"0.16em", fontWeight:700, marginBottom:20 }}>PERSONAL METRICS</div>

            {/* Date picker */}
            <div style={{ marginBottom:20 }}>
              <Label>DATE OF ENTRY</Label>
              <input type="date" value={measDate} onChange={e=>setMeasDate(e.target.value)}
                style={{ width:"100%", boxSizing:"border-box", background:C.bg,
                  border:`2px solid ${C.border}`, color:C.text, padding:"12px 16px", borderRadius:10,
                  fontSize:15, fontFamily:"inherit", outline:"none", colorScheme:"dark" }}/>
            </div>

            {/* Body weight */}
            <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, padding:"16px", marginBottom:16 }}>
              <div style={{ fontSize:12, color:C.accent, fontWeight:700, letterSpacing:"0.1em", marginBottom:12 }}>⚖️ BODY WEIGHT</div>
              <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:12 }}>
                <input type="number" placeholder="lbs" value={bwInput} onChange={e=>setBwInput(e.target.value)}
                  style={{ flex:1, background:C.bg, border:`2px solid ${bwInput?C.accent+"60":C.border}`,
                    color:C.text, padding:"12px 16px", borderRadius:10,
                    fontSize:18, fontWeight:700, fontFamily:"inherit", outline:"none" }}/>
                <button onClick={saveBodyWeight} style={{
                  background:C.accent, border:"none", color:C.bg,
                  padding:"12px 18px", borderRadius:10, fontSize:13, fontWeight:700,
                  cursor:"pointer", fontFamily:"inherit" }}>LOG</button>
              </div>
              {bodyWeight.length>0&&(
                <div style={{ maxHeight:160, overflowY:"auto" }}>
                  {bodyWeight.slice(0,10).map((e,i)=>(
                    <div key={i} style={{ display:"flex", justifyContent:"space-between",
                      padding:"7px 0", borderBottom:`1px solid ${C.border}`, fontSize:12 }}>
                      <span style={{ color:C.muted }}>{e.date}</span>
                      <span style={{ color:C.accent, fontWeight:700 }}>{e.value} lbs</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Measurements */}
            <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, padding:"16px", marginBottom:16 }}>
              <div style={{ fontSize:12, color:C.blue, fontWeight:700, letterSpacing:"0.1em", marginBottom:12 }}>📏 MEASUREMENTS (inches)</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:14 }}>
                {BODY_MEASUREMENTS.map(key=>(
                  <div key={key}>
                    <div style={{ fontSize:9, color:C.dim, letterSpacing:"0.1em", marginBottom:4 }}>{MEAS_LABELS[key].toUpperCase()}</div>
                    <input type="number" step="0.25" placeholder="in"
                      value={measInput[key]||""}
                      onChange={e=>setMeasInput(p=>({...p,[key]:e.target.value}))}
                      style={{ width:"100%", boxSizing:"border-box", background:C.bg,
                        border:`1px solid ${measInput[key]?C.blue+"60":C.border}`,
                        color:measInput[key]?C.blue:C.muted,
                        padding:"10px 12px", borderRadius:8,
                        fontSize:14, fontWeight:700, fontFamily:"inherit", outline:"none" }}/>
                  </div>
                ))}
              </div>
              <button onClick={saveMeasurements} style={{
                width:"100%", padding:"14px 0", background:C.blue, border:"none", color:C.bg,
                borderRadius:10, fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
                SAVE MEASUREMENTS
              </button>
            </div>

            {/* Measurement history */}
            {measurements.length>0&&(
              <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, padding:"16px" }}>
                <div style={{ fontSize:11, color:C.muted, fontWeight:700, letterSpacing:"0.1em", marginBottom:12 }}>MEASUREMENT HISTORY</div>
                {measurements.slice(0,3).map((entry,i)=>(
                  <div key={i} style={{ marginBottom:14, paddingBottom:14, borderBottom: i<measurements.length-1?`1px solid ${C.border}`:"none" }}>
                    <div style={{ fontSize:11, color:C.accent, fontWeight:700, marginBottom:8 }}>{entry.date}</div>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:6 }}>
                      {BODY_MEASUREMENTS.filter(k=>entry[k]).map(k=>(
                        <div key={k} style={{ fontSize:10 }}>
                          <span style={{ color:C.dim }}>{MEAS_LABELS[k].split(" ").pop()}: </span>
                          <span style={{ color:C.text, fontWeight:700 }}>{entry[k]}"</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
