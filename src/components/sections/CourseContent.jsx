import { useState } from 'react'

function LessonItem({ lesson, isEnrolled, onSelect, isActive }) {
  const isLocked = !isEnrolled && !lesson.preview

  return (
    <button
     onClick={() => !isLocked && onSelect(lesson)}
      onMouseEnter={() => {
        // Auto select & play preview videos on hover
        if (lesson.preview && !isLocked) {
          onSelect(lesson);
        }
      }}
      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all
        ${isActive ? 'bg-green-50 border-l-2 border-green-600' : 'hover:bg-gray-50'}
        ${isLocked ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
      `}
    >
      {/* Icon */}
      <div className="flex-shrink-0">
        {isLocked ? (
          <span className="text-gray-400 text-sm">🔒</span>
        ) : lesson.type === 'assignment' ? (
          <span className="text-amber-500 text-sm">📝</span>
        ) : (
          <div className="w-6 h-6 bg-red-500 rounded flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs">▶</span>
          </div>
        )}
      </div>

      {/* Title */}
      <span className={`text-sm flex-1 ${isActive ? 'text-green-700 font-semibold' : 'text-gray-700'}`}>
        {lesson.title}
        {lesson.preview && (
          <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
            Preview
          </span>
        )}
      </span>

      {/* Duration or type */}
      <span className="text-xs text-gray-400 flex-shrink-0">
        {lesson.type === 'assignment' ? 'PDF' : lesson.duration}
      </span>
    </button>
  )
}

function ModuleAccordion({ module, isEnrolled, onSelect, activeLesson }) {
  const [open, setOpen] = useState(module.id === 1) // first module open by default

  const totalLessons = module.lessons.length
  const videoCount = module.lessons.filter(l => l.type === 'video').length

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden mb-2">

      {/* Module Header */}
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between px-4 py-3.5 text-left transition-colors
          ${open ? 'bg-gray-900 text-white' : 'bg-white text-gray-900 hover:bg-gray-50'}`}
      >
        <div>
          <p className="font-semibold text-sm">{module.title}</p>
          <p className={`text-xs mt-0.5 ${open ? 'text-gray-400' : 'text-gray-400'}`}>
            {totalLessons} lesson{totalLessons !== 1 ? 's' : ''} · {videoCount} video{videoCount !== 1 ? 's' : ''}
          </p>
        </div>
        <span className={`text-lg transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          ⌃
        </span>
      </button>

      {/* Lessons */}
      {open && (
        <div className="border-t border-gray-100 divide-y divide-gray-50">
          {module.lessons.map(lesson => (
            <LessonItem
              key={lesson.id}
              lesson={lesson}
              isEnrolled={isEnrolled}
              onSelect={onSelect}
              isActive={activeLesson?.id === lesson.id}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function CourseContent({ modules, isEnrolled }) {
  const [activeLesson, setActiveLesson] = useState(
    modules?.[0]?.lessons?.[0] || null
  )

  const totalLessons = modules?.reduce((acc, m) => acc + m.lessons.length, 0) || 0
  const totalVideos = modules?.reduce(
    (acc, m) => acc + m.lessons.filter(l => l.type === 'video').length, 0
  ) || 0

  if (!modules || modules.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-gray-100 text-center">
        <p className="text-4xl mb-3">📚</p>
        <p className="text-gray-500 text-sm">
          Course content is being prepared. Check back soon!
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">

      {/* Video Player Area */}
      {activeLesson && (
        <div className="border-b border-gray-100">
          {activeLesson.type === 'video' ? (
            <>
              {(!isEnrolled && !activeLesson.preview) ? (
                /* Locked state */
                <div className="bg-gray-900 aspect-video flex flex-col items-center justify-center">
                  <span className="text-5xl mb-3">🔒</span>
                  <p className="text-white font-bold text-base mb-1">
                    This lesson is locked
                  </p>
                  <p className="text-gray-400 text-sm text-center max-w-xs">
                    Enroll in this course to unlock all video lectures
                  </p>
                </div>
              ) : (
                /* YouTube Player */
                <div className="aspect-video bg-black">
                  <iframe
                    key={activeLesson.youtubeId}
                    src={`https://www.youtube.com/embed/${activeLesson.youtubeId}?autoplay=1&rel=0`}
                    title={activeLesson.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              )}

              {/* Lesson Info */}
              <div className="p-4">
                <h3 className="font-bold text-gray-900 text-base">
                  {activeLesson.title}
                </h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-gray-400">
                    ⏱ {activeLesson.duration}
                  </span>
                  {activeLesson.preview && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                      Free Preview
                    </span>
                  )}
                  {!isEnrolled && !activeLesson.preview && (
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">
                      🔒 Enroll to watch
                    </span>
                  )}
                </div>
              </div>
            </>
          ) : (
            /* Assignment */
            <div className="p-6 bg-amber-50 border-b border-amber-100">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">📝</span>
                <div>
                  <h3 className="font-bold text-gray-900 text-base">
                    {activeLesson.title}
                  </h3>
                  <p className="text-xs text-gray-500">Assignment — PDF Download</p>
                </div>
              </div>
              {isEnrolled ? (
                <a
                  href={activeLesson.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-colors"
                >
                  📥 Download Assignment
                </a>
              ) : (
                <p className="text-sm text-gray-500">
                  🔒 Enroll to access assignments
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Course Content Header */}
      <div className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-bold text-gray-900 text-base">Course Content</h2>
        <p className="text-xs text-gray-400 mt-0.5">
          {totalLessons} lessons · {totalVideos} videos · All lecture content included
        </p>
        {!isEnrolled && (
          <div className="mt-2 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
            <p className="text-xs text-amber-700">
              🔒 <strong>Enroll to unlock all lessons.</strong> First lesson is free preview!
            </p>
          </div>
        )}
      </div>

      {/* Module List */}
      <div className="p-4">
        {modules.map(module => (
          <ModuleAccordion
            key={module.id}
            module={module}
            isEnrolled={isEnrolled}
            onSelect={setActiveLesson}
            activeLesson={activeLesson}
          />
        ))}
      </div>

    </div>
  )
}

export default CourseContent