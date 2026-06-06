/**
 * Minimal, recharts-version-agnostic tooltip prop types.
 * Recharts' own generic `TooltipProps` shifts between majors, so we declare a
 * narrow shape that matches what the custom tooltip render-prop receives.
 */
export interface ChartTooltipPayloadItem {
  value?: number | string;
  name?: string | number;
  dataKey?: string | number;
  color?: string;
  payload?: Record<string, unknown>;
}

export interface ChartTooltipProps {
  active?: boolean;
  label?: string | number;
  payload?: ChartTooltipPayloadItem[];
}
