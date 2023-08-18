CREATE OR REPLACE FUNCTION generate_short_reference_for_job()
RETURNS text AS $$
DECLARE
    short_reference text;
BEGIN
    -- Generate the short reference (modify as needed)
    short_reference := substr(md5(random()::text), 1, 8);
    
    -- Check if the 'refId' column exists in the table
    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'Job' 
        AND column_name = 'refId'
    ) THEN
        -- Ensure uniqueness
        WHILE EXISTS (SELECT 1 FROM public."Job" WHERE refId = short_reference) LOOP
            short_reference := substr(md5(random()::text), 1, 8);
        END LOOP;
    END IF;
    
    RETURN short_reference;
	
	Exception
	WHEN others THEN
		RAISE NOTICE 'Error in generate_short_reference_for_job()!';
		RETURN short_reference;
END;
$$ LANGUAGE plpgsql;