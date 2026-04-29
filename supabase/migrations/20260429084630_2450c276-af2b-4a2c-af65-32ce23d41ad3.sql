REVOKE EXECUTE ON FUNCTION public.is_parent_of(UUID, UUID) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_parent_of(UUID, UUID) TO authenticated;
