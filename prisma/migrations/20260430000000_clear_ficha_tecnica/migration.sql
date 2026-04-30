-- Limpia fichaTecnica: los valores fueron migrados desde almacenamiento local/público
-- y no corresponden a URLs de R2. Se deja en NULL para que se carguen correctamente desde R2.
UPDATE products SET "fichaTecnica" = NULL WHERE "fichaTecnica" IS NOT NULL;
