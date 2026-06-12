/**
 * Data access layer — the single seam between the UI and the data source.
 *
 * Today every getter returns the static demo dataset from `lib/mock-data`.
 * When the real API lands, swap the implementations here (sync constants →
 * async fetchers) and migrate call sites incrementally; no component should
 * ever import `lib/mock-data` directly.
 */

import {
  AGGREGATORS,
  AT_RISK_MEMBERS,
  CHURN_SERIES,
  COHORT_SIZES,
  COHORTS,
  CONVERSION_CANDIDATES,
  DIRECT_REVENUE,
  GYM,
  INTEGRATIONS,
  KPIS,
  INSURANCE_CERT,
  MEMBER_BADGES,
  MEMBER_CHALLENGES,
  MEMBER_COUNTS,
  MEMBER_ME,
  MEMBER_POINTS_FEED,
  MEMBER_REFERRAL,
  MEMBER_REWARDS,
  MEMBERS,
  NOTIFICATIONS,
  OCCUPANCY,
  PAYOUT_AUDIT,
  RECENT_SEARCHES,
  RETENTION_SERIES,
  REWARD_ACTIVITY,
  REWARDS,
  ROI_DEFAULTS,
  SAVED_LOG,
} from "@/lib/mock-data";

/* ---------- Gym owner dashboard ---------- */

export const getGym = () => GYM;
export const getKpis = () => KPIS;
export const getMembers = () => MEMBERS;
export const getMemberCounts = () => MEMBER_COUNTS;
export const getAtRiskMembers = () => AT_RISK_MEMBERS;
export const getRetentionSeries = () => RETENTION_SERIES;
export const getRewardActivity = () => REWARD_ACTIVITY;
export const getRewards = () => REWARDS;
export const getCohorts = () => COHORTS;
export const getCohortSizes = () => COHORT_SIZES;
export const getChurnSeries = () => CHURN_SERIES;
export const getRoiDefaults = () => ROI_DEFAULTS;
export const getAggregators = () => AGGREGATORS;
export const getPayoutAudit = () => PAYOUT_AUDIT;
export const getDirectRevenue = () => DIRECT_REVENUE;
export const getConversionCandidates = () => CONVERSION_CANDIDATES;
export const getSavedLog = () => SAVED_LOG;
export const getIntegrations = () => INTEGRATIONS;
export const getNotifications = () => NOTIFICATIONS;
export const getRecentSearches = () => RECENT_SEARCHES;

/* ---------- Member app ---------- */

export const getMemberProfile = () => MEMBER_ME;
export const getMemberChallenges = () => MEMBER_CHALLENGES;
export const getMemberRewards = () => MEMBER_REWARDS;
export const getMemberBadges = () => MEMBER_BADGES;
export const getMemberPointsFeed = () => MEMBER_POINTS_FEED;
export const getMemberReferral = () => MEMBER_REFERRAL;
export const getInsuranceCert = () => INSURANCE_CERT;
export const getOccupancy = () => OCCUPANCY;

/* ---------- Compatibility re-exports ----------
 * Existing components import the constants directly; they now do so through
 * this module. New code should prefer the getters above.
 */
export {
  AGGREGATORS,
  AT_RISK_MEMBERS,
  CHURN_SERIES,
  COHORT_SIZES,
  COHORTS,
  CONVERSION_CANDIDATES,
  DIRECT_REVENUE,
  GYM,
  INSURANCE_CERT,
  INTEGRATIONS,
  KPIS,
  MEMBER_BADGES,
  MEMBER_CHALLENGES,
  MEMBER_COUNTS,
  MEMBER_ME,
  MEMBER_POINTS_FEED,
  MEMBER_REFERRAL,
  MEMBER_REWARDS,
  MEMBERS,
  NOTIFICATIONS,
  OCCUPANCY,
  PAYOUT_AUDIT,
  RECENT_SEARCHES,
  RETENTION_SERIES,
  REWARD_ACTIVITY,
  REWARDS,
  ROI_DEFAULTS,
  SAVED_LOG,
};
export { DEMO_YEAR } from "@/lib/mock-data";
export type { SavedMemberEntry } from "@/lib/mock-data";
