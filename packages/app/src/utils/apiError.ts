export function apiError(message: string, status: number) {
  return Response.json({ error: message }, { status });
}
