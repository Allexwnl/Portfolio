import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lxspfsdaxqyicwpdxsbb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4c3Bmc2RheHF5aWN3cGR4c2JiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyOTQ1NDMsImV4cCI6MjA3Nzg3MDU0M30.M2QIszTD7hkOQP-ElJKO9JIWKoCrNWJ8eGVhwONAMUA'
export const supabase = createClient(supabaseUrl, supabaseKey)
5