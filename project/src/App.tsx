import React, { useState } from 'react';
import { FileUploader } from './components/FileUploader';
import { FileList } from './components/FileList';
import { Calendar } from './components/Calendar/Calendar';
import { EventForm } from './components/Calendar/EventForm';
import { EventList } from './components/Calendar/EventList';
import { ChatWindow } from './components/Chat/ChatWindow';
import { BoardsView } from './components/Boards/BoardsView';
import { useFileUpload } from './hooks/useFileUpload';
import { useCalendar } from './hooks/useCalendar';
import { Upload, Calendar as CalendarIcon, MessageSquare, LayoutGrid, Plus } from 'lucide-react';

function App() {
  const { files, addFiles, removeFile } = useFileUpload();
  const { events, addEvent, deleteEvent } = useCalendar();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showNewEventForm, setShowNewEventForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'boards' | 'calendar' | 'files' | 'chat'>('boards');

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleEventSubmit = (eventData: { title: string; description: string; time: string; color: string }) => {
    if (selectedDate) {
      addEvent(selectedDate, eventData);
      setSelectedDate(null);
      setShowNewEventForm(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-[1600px] mx-auto py-6 px-4">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            {activeTab === 'boards' ? (
              <LayoutGrid className="w-16 h-16 text-blue-500" />
            ) : activeTab === 'calendar' ? (
              <CalendarIcon className="w-16 h-16 text-blue-500" />
            ) : activeTab === 'files' ? (
              <Upload className="w-16 h-16 text-blue-500" />
            ) : (
              <MessageSquare className="w-16 h-16 text-blue-500" />
            )}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {activeTab === 'boards'
              ? 'Painéis'
              : activeTab === 'calendar'
              ? 'Calendário de Eventos'
              : activeTab === 'files'
              ? 'Compartilhamento de Arquivos'
              : 'Chat'}
          </h1>
          <p className="text-gray-600">
            {activeTab === 'boards'
              ? 'Gerencie seus projetos e tarefas'
              : activeTab === 'calendar'
              ? 'Organize seus eventos e compromissos'
              : activeTab === 'files'
              ? 'Envie e compartilhe seus arquivos de forma rápida e simples'
              : 'Converse em tempo real'}
          </p>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('boards')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
              activeTab === 'boards'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Painéis
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
              activeTab === 'calendar'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Calendário
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
              activeTab === 'chat'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Chat
          </button>
          <button
            onClick={() => setActiveTab('files')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
              activeTab === 'files'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Arquivos
          </button>
        </div>

        {activeTab === 'boards' ? (
          <BoardsView onNavigate={setActiveTab} />
        ) : activeTab === 'calendar' ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <Calendar
                events={events}
                onDateClick={handleDateClick}
                selectedDate={selectedDate}
              />
            </div>
            <div className="space-y-6">
              {selectedDate || showNewEventForm ? (
                <EventForm
                  selectedDate={selectedDate || new Date()}
                  onSubmit={handleEventSubmit}
                  onClose={() => {
                    setSelectedDate(null);
                    setShowNewEventForm(false);
                  }}
                />
              ) : (
                events.length > 0 && (
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Eventos</h3>
                      <button
                        onClick={() => setShowNewEventForm(true)}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                        title="Adicionar novo evento"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                    <EventList events={events} onDelete={deleteEvent} />
                  </div>
                )
              )}
            </div>
          </div>
        ) : activeTab === 'files' ? (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <FileUploader onFileSelect={addFiles} />
            {files.length > 0 && <FileList files={files} onRemove={removeFile} />}
            {files.length > 0 && (
              <div className="mt-6 text-center text-sm text-gray-500">
                {files.filter((f) => f.uploaded).length} de {files.length} arquivos enviados
              </div>
            )}
          </div>
        ) : (
          <ChatWindow />
        )}
      </div>
    </div>
  );
}

export default App;