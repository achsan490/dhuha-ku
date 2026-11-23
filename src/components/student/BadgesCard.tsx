import React from 'react';
import { Student } from '../../types';
import { Award, Flame, Shield, Trophy } from 'lucide-react';

export const BadgesCard: React.FC<{ student: Student }> = ({ student }) => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          <h3 className="font-bold text-slate-800 text-sm">Koleksi Lencana Karakter</h3>
        </div>
        <span className="text-xs bg-amber-50 text-amber-800 font-bold px-2 py-0.5 rounded-full border border-amber-200">
          {student.badges.length} Lencana Terbuka
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {student.badges.map(b => (
          <div
            key={b.id}
            className="p-3 bg-gradient-to-br from-amber-50/50 to-orange-50/30 rounded-xl border border-amber-200/60 flex items-start gap-3"
          >
            <span className="text-2xl flex-shrink-0">{b.icon}</span>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-slate-800">{b.name}</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-tight mt-0.5">{b.description}</p>
              <span className="inline-block text-[9px] bg-white text-amber-800 font-semibold px-1.5 py-0.2 rounded border border-amber-200 mt-1.5">
                Kategori: {b.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

