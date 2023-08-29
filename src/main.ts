import { createApp } from 'vue'
import { supabase } from "@/config/supabaseClient.js";
import App from './App.vue'
import './index.css'

window.$supabase = supabase;

createApp(App).mount('#app')
