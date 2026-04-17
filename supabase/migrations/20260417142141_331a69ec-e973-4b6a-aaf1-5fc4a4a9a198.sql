-- Create savings_jars table for multiple categorized savings goals
CREATE TABLE public.savings_jars (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  emoji TEXT NOT NULL DEFAULT '🎯',
  target_amount NUMERIC NOT NULL DEFAULT 0,
  saved_amount NUMERIC NOT NULL DEFAULT 0,
  color TEXT NOT NULL DEFAULT 'emerald',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.savings_jars ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own savings jars"
ON public.savings_jars FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own savings jars"
ON public.savings_jars FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own savings jars"
ON public.savings_jars FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own savings jars"
ON public.savings_jars FOR DELETE
USING (auth.uid() = user_id);

CREATE TRIGGER update_savings_jars_updated_at
BEFORE UPDATE ON public.savings_jars
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_savings_jars_user_id ON public.savings_jars(user_id);