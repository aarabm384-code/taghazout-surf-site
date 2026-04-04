import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const COMMISSION = 100;
const ADMIN_PASSWORD = 'govisit2024';

export const AdminPage = () => {
  const [auth, setAuth] = useState(false);
  const [pass, setPass] = useState('');
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (auth) fetchBookings();
  }, [auth]);

  const fetchBookings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) console.error(error);
    else setBookings(data || []);
    setLoading(false);
  };

  const filtered = bookings.filter((b) => {
    if (filter === 'all') return true;
    const date = new Date(b.created_at);
    const now = new Date();
    if (filter === 'today') return date.toDateString() === now.toDateString();
    if (filter === 'week') return (now.getTime() - date.getTime()) < 7 * 24 * 60 * 60 * 1000;
    return true;
  });

  const totalRevenue = filtered.reduce((sum, b) => sum + (b.price || 0), 0);
  const totalCommission = filtered.length * COMMISSION;

  if (!auth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 w-full max-w-sm">
          <h1 className="text-2xl font-black text-gray-900 mb-2 text-center">🔐 Admin Login</h1>
          <p className="text-gray-500 text-sm text-center mb-6">GoVisit Taghazout</p>
          <input
            type="password"
            placeholder="كلمة المرور"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (pass === ADMIN_PASSWORD ? setAuth(true) : alert('كلمة المرور خاطئة!'))}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 mb-4 text-right outline-none focus:border-blue-400"
          />
          <button
            onClick={() => pass === ADMIN_PASSWORD ? setAuth(true) : alert('كلمة المرور خاطئة!')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all"
          >
            دخول
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-gray-900">📊 Admin Dashboard</h1>
            <p className="text-gray-500 mt-1">GoVisit Taghazout — لوحة التحكم</p>
          </div>
          <button onClick={() => setAuth(false)} className="text-sm text-gray-400 hover:text-red-500 transition-colors">
            خروج 🚪
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 font-medium">إجمالي الحجوزات</p>
            <p className="text-4xl font-black text-blue-600 mt-2">{filtered.length}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 font-medium">إجمالي المبيعات</p>
            <p className="text-4xl font-black text-gray-900 mt-2">{totalRevenue} <span className="text-lg">MAD</span></p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 font-medium">عمولتك (100 درهم/حجز)</p>
            <p className="text-4xl font-black text-green-600 mt-2">{totalCommission} <span className="text-lg">MAD</span></p>
          </div>
        </div>

        <div className="flex gap-3 mb-6">
          {['all', 'today', 'week'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${filter === f ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}
            >
              {f === 'all' ? 'الكل' : f === 'today' ? 'اليوم' : 'هذا الأسبوع'}
            </button>
          ))}
          <button onClick={fetchBookings} className="px-4 py-2 rounded-lg font-semibold text-sm bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all mr-auto">
            🔄 تحديث
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-20 text-center text-gray-400">جاري التحميل...</div>
          ) : filtered.length === 0 ? (
            <div className="p-20 text-center text-gray-400">لا توجد حجوزات</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-right text-xs font-bold text-gray-500 uppercase px-6 py-4">الخدمة</th>
                  <th className="text-right text-xs font-bold text-gray-500 uppercase px-6 py-4">السعر</th>
                  <th className="text-right text-xs font-bold text-gray-500 uppercase px-6 py-4">عمولتك</th>
                  <th className="text-right text-xs font-bold text-gray-500 uppercase px-6 py-4">التاريخ</th>
                  <th className="text-right text-xs font-bold text-gray-500 uppercase px-6 py-4">الصفحة</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((b) => (
                  <tr key={b.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-900">{b.service_name}</td>
                    <td className="px-6 py-4 text-gray-700">{b.price} MAD</td>
                    <td className="px-6 py-4 font-bold text-green-600">100 MAD</td>
                    <td className="px-6 py-4 text-gray-500 text-sm">{new Date(b.created_at).toLocaleString('ar-MA')}</td>
                    <td className="px-6 py-4 text-gray-400 text-xs truncate max-w-[150px]">{b.page_url || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};wwww