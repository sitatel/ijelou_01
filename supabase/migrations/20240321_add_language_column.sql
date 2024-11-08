-- Add language column to profiles table
ALTER TABLE public.profiles
ADD COLUMN language VARCHAR(2) DEFAULT 'en';

-- Update existing profiles to have default language
UPDATE public.profiles SET language = 'en' WHERE language IS NULL;