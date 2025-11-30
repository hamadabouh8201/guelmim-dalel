-- Create bus_lines table
CREATE TABLE public.bus_lines (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT NOT NULL,
  description TEXT,
  neighborhoods TEXT,
  main_stops TEXT,
  schedule_morning TEXT,
  schedule_afternoon TEXT,
  schedule_evening TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create services table
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  address TEXT,
  opening_hours TEXT,
  google_maps_url TEXT,
  near_bus_lines TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create education_places table
CREATE TABLE public.education_places (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  near_bus_lines TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create places table (shops/markets)
CREATE TABLE public.places (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  near_bus_lines TEXT,
  is_highlighted BOOLEAN NOT NULL DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create important_numbers table
CREATE TABLE public.important_numbers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  label TEXT NOT NULL,
  phone TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contact_messages table
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  business_name TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.bus_lines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education_places ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.places ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.important_numbers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on bus_lines" 
ON public.bus_lines FOR SELECT USING (true);

CREATE POLICY "Allow public read access on services" 
ON public.services FOR SELECT USING (true);

CREATE POLICY "Allow public read access on education_places" 
ON public.education_places FOR SELECT USING (true);

CREATE POLICY "Allow public read access on places" 
ON public.places FOR SELECT USING (true);

CREATE POLICY "Allow public read access on important_numbers" 
ON public.important_numbers FOR SELECT USING (true);

-- Allow anyone to insert contact messages
CREATE POLICY "Allow public insert on contact_messages" 
ON public.contact_messages FOR INSERT WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX idx_bus_lines_code ON public.bus_lines(code);
CREATE INDEX idx_services_category ON public.services(category);
CREATE INDEX idx_education_places_type ON public.education_places(type);
CREATE INDEX idx_places_type ON public.places(type);
CREATE INDEX idx_places_highlighted ON public.places(is_highlighted);
CREATE INDEX idx_important_numbers_category ON public.important_numbers(category);