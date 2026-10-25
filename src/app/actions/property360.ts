'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export type Property360Data = {
  property_type: string;
  city: string;
  address: string;
  area_sqm: string;
  rooms: string;
  floor: string;
  parking: boolean;
  elevator: boolean;
  balcony: boolean;
  status: string;
  current_monthly_rent: string;
  interests: string[];
  full_name: string;
  phone: string;
  email: string;
  consent: boolean;
  utm_source?: string;
  utm_campaign?: string;
  utm_content?: string;
};

export async function submitProperty360(data: Property360Data) {
  const fullName = data.full_name.trim();
  const phone = data.phone.replace(/[\s-]/g, '');
  const email = data.email.trim();

  if (!fullName) {
    throw new Error('יש להזין שם מלא.');
  }

  if (!/^0[2-9]\d{7,8}$/.test(phone)) {
    throw new Error('יש להזין מספר טלפון תקין.');
  }

  if (email && !/^\S+@\S+\.\S+$/.test(email)) {
    throw new Error('יש להזין כתובת אימייל תקינה.');
  }

  if (!data.consent) {
    throw new Error('נדרשת הסכמה ליצירת קשר כדי לשלוח את הבדיקה.');
  }

  const supabase = await createClient();

  // Build a summary message from wizard fields that have no dedicated column
  const details: string[] = [];
  if (data.address) details.push(`כתובת: ${data.address}`);
  if (data.area_sqm) details.push(`שטח: ${data.area_sqm} מ"ר`);
  if (data.rooms) details.push(`חדרים: ${data.rooms}`);
  if (data.floor) details.push(`קומה: ${data.floor}`);
  const extras = [data.parking && 'חניה', data.elevator && 'מעלית', data.balcony && 'מרפסת'].filter(Boolean);
  if (extras.length) details.push(`תוספות: ${extras.join(', ')}`);
  if (data.status) details.push(`מצב הנכס: ${data.status}`);
  if (data.current_monthly_rent) details.push(`שכירות חודשית: ₪${data.current_monthly_rent}`);
  if (data.interests.length) details.push(`תחומי עניין: ${data.interests.join(', ')}`);

  const { error } = await supabase.from('leads').insert({
    full_name: fullName,
    phone,
    email: email || null,
    lead_type: 'owner' as const,
    source: 'property360',
    utm_source: data.utm_source ?? null,
    utm_campaign: data.utm_campaign ?? null,
    utm_content: data.utm_content ?? null,
    property_type: data.property_type || null,
    city: data.city || null,
    message: details.join(' | ') || null,
    status: 'חדש' as const,
  });

  if (error) {
    console.error('property360 insert error:', error);
    throw new Error('שגיאה בשמירת הפרטים. נסו שוב.');
  }

  redirect('/thank-you');
}
