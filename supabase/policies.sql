-- Política para permitir lectura pública de perfiles
CREATE POLICY "Permitir lectura pública de perfiles"
ON public.profiles
FOR SELECT
USING (true);

-- Política para permitir a los usuarios insertar su propio perfil
CREATE POLICY "Permitir inserción de perfil propio"
ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = id);

-- Política para permitir a los usuarios actualizar su propio perfil
CREATE POLICY "Permitir actualización de perfil propio"
ON public.profiles
FOR UPDATE
USING (auth.uid() = id);

-- Política para permitir a los usuarios eliminar su propio perfil
CREATE POLICY "Permitir eliminación de perfil propio"
ON public.profiles
FOR DELETE
USING (auth.uid() = id);