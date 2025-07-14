import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { X } from 'lucide-react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

export default function PreviewModal({ isOpen, onClose, marker, landmark, description }) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="transition-opacity duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40" />
        </Transition.Child>

        {/* Modal Content */}
        <div className="min-h-screen flex items-center justify-center px-4">
          <Transition.Child
            as={Fragment}
            enter="transition-transform duration-300"
            enterFrom="scale-95 opacity-0"
            enterTo="scale-100 opacity-100"
            leave="transition-transform duration-200"
            leaveFrom="scale-100 opacity-100"
            leaveTo="scale-95 opacity-0"
          >
            <Dialog.Panel className="bg-white dark:bg-gray-900 rounded-xl max-w-2xl w-full shadow-lg overflow-hidden">
              <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Address Preview
                </h3>
                <button onClick={onClose} className="text-gray-500 hover:text-red-500">
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <p className="font-semibold text-gray-600 dark:text-gray-300">Landmark</p>
                  <p className="text-lg text-gray-900 dark:text-white">{landmark}</p>
                </div>

                {description && (
                  <div>
                    <p className="font-semibold text-gray-600 dark:text-gray-300">Notes</p>
                    <p className="text-gray-800 dark:text-gray-200">{description}</p>
                  </div>
                )}

                {marker && (
                  <div className="mt-4">
                    <p className="font-semibold text-gray-600 dark:text-gray-300 mb-2">Location</p>
                    <div className="h-64 w-full rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700">
                      <MapPreview marker={marker} />
                    </div>
                  </div>
                )}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

function MapPreview({ marker }) {
  const mapContainerRef = useRef(null)

  useEffect(() => {
    if (!mapContainerRef.current || !marker) return

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
      center: [marker.longitude, marker.latitude],
      zoom: 16,
    })

    new maplibregl.Marker({ color: '#E63946' })
      .setLngLat([marker.longitude, marker.latitude])
      .addTo(map)

    return () => map.remove()
  }, [marker])

  return <div ref={mapContainerRef} className="w-full h-full" />
}
