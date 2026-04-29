-- LMS core tables

-- Lesson progress per user
CREATE TABLE IF NOT EXISTS public.lesson_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  lesson_id TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false,
  quiz_correct INT NOT NULL DEFAULT 0,
  quiz_total INT NOT NULL DEFAULT 0,
  xp_earned INT NOT NULL DEFAULT 0,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, lesson_id)
);

ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own progress" ON public.lesson_progress
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own progress" ON public.lesson_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own progress" ON public.lesson_progress
  FOR UPDATE USING (auth.uid() = user_id);

CREATE TRIGGER lesson_progress_updated_at
  BEFORE UPDATE ON public.lesson_progress
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- XP + streak per user
CREATE TABLE IF NOT EXISTS public.user_stats (
  user_id UUID NOT NULL PRIMARY KEY,
  total_xp INT NOT NULL DEFAULT 0,
  current_streak INT NOT NULL DEFAULT 0,
  longest_streak INT NOT NULL DEFAULT 0,
  last_active_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own stats" ON public.user_stats
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users upsert own stats" ON public.user_stats
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own stats" ON public.user_stats
  FOR UPDATE USING (auth.uid() = user_id);

CREATE TRIGGER user_stats_updated_at
  BEFORE UPDATE ON public.user_stats
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Badges earned
CREATE TABLE IF NOT EXISTS public.user_badges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  badge_code TEXT NOT NULL,
  earned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, badge_code)
);

ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own badges" ON public.user_badges
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own badges" ON public.user_badges
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Parent-child links so parents can view their child's progress
CREATE TABLE IF NOT EXISTS public.parent_child_links (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  parent_id UUID NOT NULL,
  child_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (parent_id, child_id)
);

ALTER TABLE public.parent_child_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Parents view own links" ON public.parent_child_links
  FOR SELECT USING (auth.uid() = parent_id OR auth.uid() = child_id);
CREATE POLICY "Parents create own links" ON public.parent_child_links
  FOR INSERT WITH CHECK (auth.uid() = parent_id);
CREATE POLICY "Parents delete own links" ON public.parent_child_links
  FOR DELETE USING (auth.uid() = parent_id);

-- Helper: is_parent_of(parent, child)
CREATE OR REPLACE FUNCTION public.is_parent_of(_parent UUID, _child UUID)
RETURNS BOOLEAN
LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.parent_child_links
    WHERE parent_id = _parent AND child_id = _child
  )
$$;

-- Allow parents to view linked child's progress + stats + badges + profile
CREATE POLICY "Parents view child progress" ON public.lesson_progress
  FOR SELECT USING (public.is_parent_of(auth.uid(), user_id));
CREATE POLICY "Parents view child stats" ON public.user_stats
  FOR SELECT USING (public.is_parent_of(auth.uid(), user_id));
CREATE POLICY "Parents view child badges" ON public.user_badges
  FOR SELECT USING (public.is_parent_of(auth.uid(), user_id));
CREATE POLICY "Parents view child profile" ON public.profiles
  FOR SELECT USING (public.is_parent_of(auth.uid(), user_id));
