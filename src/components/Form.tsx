'use client'

import * as React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm, type UseFormReturn } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface OpcionConfig {
  valor: string
  etiqueta: string
  descripcion?: string
}

interface CampoConfig {
  _key: string
  clave: string
  etiqueta: string
  tipo:
    | 'text'
    | 'email'
    | 'tel'
    | 'number'
    | 'date'
    | 'time'
    | 'textarea'
    | 'radio'
    | 'checkbox'
  placeholder?: string
  descripcion?: string
  obligatorio?: boolean
  anchoColumna?: 'completo' | 'mitad'
  opciones?: OpcionConfig[]
  incluyeOpcionOtro?: boolean
  origenDinamico?: 'ninguno' | 'eventos' | 'propuestas'
  opcionFijaFinal?: OpcionConfig
}

interface FormConfig {
  paso1Titulo?: string
  paso1Subtitulo?: string
  paso2Titulo?: string
  paso2Subtitulo?: string
  camposPaso1?: CampoConfig[]
  camposPaso2?: CampoConfig[]
  textoBotonSiguiente?: string
  textoBotonVolver?: string
  textoBotonEnviar?: string
}

interface EventoOption {
  nombreEvento: string
  emojiPreVista?: string
}

interface PropuestaOption {
  titulo: string
  descripcion?: string
}

export interface FormPresupuestoProps {
  config?: FormConfig | null
  eventos?: EventoOption[]
  propuestas?: PropuestaOption[]
}

// ---------------------------------------------------------------------------
// Default configuration — used when no Sanity document exists yet
// ---------------------------------------------------------------------------
const DEFAULT_CONFIG: FormConfig = {
  paso1Titulo: 'Datos personales',
  paso2Titulo: 'Datos del evento',
  paso2Subtitulo:
    'Estas respuestas son orientativas: podemos personalizar todo.',
  textoBotonSiguiente: 'Siguiente →',
  textoBotonVolver: '← Volver',
  textoBotonEnviar: 'Enviar solicitud',
  camposPaso1: [
    {
      _key: 'email',
      clave: 'email',
      etiqueta: 'Correo',
      tipo: 'email',
      placeholder: 'tu@email.com',
      descripcion: 'Usaremos este mail para enviarte el presupuesto.',
      obligatorio: true,
    },
    {
      _key: 'telefono',
      clave: 'telefono',
      etiqueta: 'Teléfono',
      tipo: 'tel',
      placeholder: '+54 11 1234-5678',
      descripcion: 'Si preferís que te contactemos por WhatsApp, dejalo acá.',
      obligatorio: false,
    },
    {
      _key: 'nombre',
      clave: 'nombre',
      etiqueta: '¿Cuál es tu nombre?',
      tipo: 'text',
      placeholder: 'Nombre y apellido / o empresa',
      obligatorio: true,
    },
    {
      _key: 'tipoEvento',
      clave: 'tipoEvento',
      etiqueta: '¿Qué tipo de evento es?',
      tipo: 'radio',
      obligatorio: true,
      origenDinamico: 'eventos',
      incluyeOpcionOtro: true,
    },
    {
      _key: 'fecha',
      clave: 'fecha',
      etiqueta: 'Fecha',
      tipo: 'date',
      obligatorio: true,
      anchoColumna: 'mitad',
    },
    {
      _key: 'hora',
      clave: 'hora',
      etiqueta: 'Hora',
      tipo: 'time',
      obligatorio: true,
      anchoColumna: 'mitad',
    },
    {
      _key: 'cantidadPersonas',
      clave: 'cantidadPersonas',
      etiqueta: '¿Cuántas personas asistirán?',
      tipo: 'number',
      placeholder: 'Ej: 50',
      descripcion:
        'Recordá: el mínimo de reserva es 25 personas (si son menos, se abona el equivalente a 25).',
      obligatorio: true,
    },
    {
      _key: 'tandaComida',
      clave: 'tandaComida',
      etiqueta: '¿El evento requiere más de una tanda de comida?',
      tipo: 'radio',
      obligatorio: true,
      opciones: [
        {
          valor: 'extendido',
          etiqueta: 'Sí, dos o más',
          descripcion: 'Recepción / principal / postre / final de fiesta',
        },
        {
          valor: 'estandar',
          etiqueta: 'No, una sola',
          descripcion: 'Almuerzo o cena',
        },
      ],
    },
    {
      _key: 'ubicacion',
      clave: 'ubicacion',
      etiqueta: '¿Dónde será tu evento?',
      tipo: 'text',
      placeholder: 'Dirección exacta o zona',
      descripcion:
        'Dirección exacta; si aún no tenés locación, indicá zona y si necesitás recomendaciones.',
      obligatorio: true,
    },
    {
      _key: 'parrilla',
      clave: 'parrilla',
      etiqueta: '¿Cuentan con parrilla? Aclarar medidas',
      tipo: 'textarea',
      placeholder: 'Medidas, espacio disponible, acceso...',
      descripcion:
        'Si no hay, nos ocupamos nosotros. Indicanos espacio disponible y acceso (terraza, jardín, salón).',
      obligatorio: false,
    },
    {
      _key: 'restricciones',
      clave: 'restricciones',
      etiqueta: 'Requerimientos especiales / restricciones alimentarias',
      tipo: 'textarea',
      placeholder: 'Celíacos, vegetarianos, veganos...',
      descripcion:
        'Ej.: celíacos (¿cuántas personas?), vegetarianos, veganos, sin sal, sin azúcar, etc.',
      obligatorio: false,
    },
    {
      _key: 'comentariosLogisticos',
      clave: 'comentariosLogisticos',
      etiqueta: 'Comentarios logísticos (opcional)',
      tipo: 'textarea',
      placeholder: 'Accesos, ascensores, horarios...',
      descripcion:
        'Accesos, ascensores, horarios de armado/desarme, enchufes, agua, plan por lluvia, etc.',
      obligatorio: false,
    },
  ],
  camposPaso2: [
    {
      _key: 'recepcion',
      clave: 'recepcion',
      etiqueta: 'Recepción',
      tipo: 'radio',
      descripcion: 'Elegí una opción',
      opciones: [
        { valor: 'tabla-fiambres', etiqueta: '��� Tabla de fiambres caseros' },
        {
          valor: 'pinchos',
          etiqueta:
            '��� Pinchos bandejeados (matambrito, mollejas, provoletas)',
        },
        { valor: 'sin-recepcion', etiqueta: 'No quiero recepción' },
      ],
    },
    {
      _key: 'platoPrincipal',
      clave: 'platoPrincipal',
      etiqueta: 'Plato principal',
      tipo: 'radio',
      descripcion: 'Elegí tu estilo',
      origenDinamico: 'propuestas',
      opcionFijaFinal: {
        valor: 'no-decidido',
        etiqueta: 'No lo tengo decidido',
        descripcion: 'Me gustaría charlarlo con ustedes',
      },
    },
    {
      _key: 'adicionales',
      clave: 'adicionales',
      etiqueta: 'Adicionales',
      tipo: 'checkbox',
      descripcion: 'Tildá lo que te interese',
      opciones: [
        {
          valor: 'achuras',
          etiqueta: 'Achuras (chinchulines, mollejas, morcilla)',
        },
        { valor: 'papas-fritas', etiqueta: 'Papas fritas' },
        { valor: 'provoleta', etiqueta: 'Provoleta parrillera' },
        {
          valor: 'vajilla-completa',
          etiqueta:
            'Vajilla completa (plato, cubiertos, copa, panera, ensaladera, hielera)',
        },
      ],
    },
    {
      _key: 'postres',
      clave: 'postres',
      etiqueta: 'Postres',
      tipo: 'radio',
      opciones: [
        {
          valor: '1-opcion',
          etiqueta:
            '1 opción a elección (Queso y dulce / Imperial / Paletas heladas / Bombón escocés)',
        },
        {
          valor: 'mesa-dulce',
          etiqueta:
            '��� Mesa dulce completa (Lemon pie, Balcarce, Marquise, Tarta de frutilla, Tarta tofi, Torta Oreo, Chocolatosa, Pastafrola)',
        },
        { valor: 'sin-postres', etiqueta: 'No incluir postres' },
      ],
    },
    {
      _key: 'serviciosAdicionales',
      clave: 'serviciosAdicionales',
      etiqueta: 'Servicios adicionales (opcional)',
      tipo: 'checkbox',
      opciones: [
        {
          valor: 'fogoneros',
          etiqueta: 'Fogoneros / asadores (show de fuegos)',
        },
        { valor: 'vajilla', etiqueta: 'Vajilla' },
        { valor: 'mesas-trabajo', etiqueta: 'Mesas de trabajo' },
        { valor: 'gazebo', etiqueta: 'Gazebo' },
        { valor: 'barras-vinos', etiqueta: 'Barras y vinos' },
        { valor: 'ambientacion', etiqueta: 'Ambientación / mobiliario' },
        { valor: 'locaciones', etiqueta: 'Locaciones' },
        { valor: 'artistas', etiqueta: 'Artistas' },
        {
          valor: 'timing',
          etiqueta: 'Armado de timing (horarios y momentos del evento)',
        },
        { valor: 'produccion', etiqueta: 'Asistencia en la producción' },
      ],
    },
    {
      _key: 'presupuestoEstimado',
      clave: 'presupuestoEstimado',
      etiqueta: 'Presupuesto estimado por persona (opcional)',
      tipo: 'radio',
      opciones: [
        { valor: 'sin-tope', etiqueta: 'Sin tope / Quiero propuesta ideal' },
        { valor: 'hasta-25000', etiqueta: 'Hasta $25.000' },
        { valor: '25001-35000', etiqueta: '$25.001 – $35.000' },
        { valor: '35001-50000', etiqueta: '$35.001 – $50.000' },
        { valor: 'mas-50000', etiqueta: '+$50.000' },
      ],
    },
  ],
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

function Req() {
  return <span className='text-orange-500 ml-0.5'>*</span>
}

// ---------------------------------------------------------------------------
// Dynamic Zod schema builder
// ---------------------------------------------------------------------------
function buildZodShape(campos: CampoConfig[]) {
  const shape: Record<string, z.ZodTypeAny> = {}

  for (const campo of campos) {
    if (campo.tipo === 'checkbox') {
      shape[campo.clave] = campo.obligatorio
        ? z.array(z.string()).min(1, `${campo.etiqueta} es obligatorio`)
        : z.array(z.string()).optional()
    } else if (campo.tipo === 'email') {
      shape[campo.clave] = campo.obligatorio
        ? z
            .string()
            .min(1, `${campo.etiqueta} es obligatorio`)
            .email('Ingresá un correo válido')
        : z.string().optional()
    } else {
      shape[campo.clave] = campo.obligatorio
        ? z.string().min(1, `${campo.etiqueta} es obligatorio`)
        : z.string().optional()
    }

    if (campo.incluyeOpcionOtro) {
      shape[`${campo.clave}_otro`] = z.string().optional()
    }
  }

  return shape
}

function buildDefaults(campos: CampoConfig[]) {
  const defaults: Record<string, string | string[]> = {}
  for (const campo of campos) {
    defaults[campo.clave] = campo.tipo === 'checkbox' ? [] : ''
    if (campo.incluyeOpcionOtro) {
      defaults[`${campo.clave}_otro`] = ''
    }
  }
  return defaults
}

// ---------------------------------------------------------------------------
// Resolve options for radio/checkbox fields
// ---------------------------------------------------------------------------
function getResolvedOptions(
  campo: CampoConfig,
  eventos: EventoOption[],
  propuestas: PropuestaOption[],
): OpcionConfig[] {
  if (campo.origenDinamico === 'eventos') {
    const opts: OpcionConfig[] = eventos.map((e) => ({
      valor: slugify(e.nombreEvento),
      etiqueta: e.emojiPreVista
        ? `${e.emojiPreVista} ${e.nombreEvento}`
        : e.nombreEvento,
    }))
    if (campo.opcionFijaFinal) opts.push(campo.opcionFijaFinal)
    return opts
  }

  if (campo.origenDinamico === 'propuestas') {
    const opts: OpcionConfig[] = propuestas.map((p) => ({
      valor: slugify(p.titulo),
      etiqueta: p.titulo,
      descripcion: p.descripcion,
    }))
    if (campo.opcionFijaFinal) opts.push(campo.opcionFijaFinal)
    return opts
  }

  return campo.opciones || []
}

// ---------------------------------------------------------------------------
// Group consecutive half-width fields into rows
// ---------------------------------------------------------------------------
function groupFieldsByWidth(campos: CampoConfig[]): CampoConfig[][] {
  const rows: CampoConfig[][] = []
  let halfGroup: CampoConfig[] = []

  for (const campo of campos) {
    if (campo.anchoColumna === 'mitad') {
      halfGroup.push(campo)
      if (halfGroup.length === 2) {
        rows.push([...halfGroup])
        halfGroup = []
      }
    } else {
      if (halfGroup.length > 0) {
        rows.push([...halfGroup])
        halfGroup = []
      }
      rows.push([campo])
    }
  }
  if (halfGroup.length > 0) rows.push(halfGroup)

  return rows
}

// ---------------------------------------------------------------------------
// Single field renderer
// ---------------------------------------------------------------------------
function RenderCampo({
  campo,
  form,
  eventos,
  propuestas,
}: {
  campo: CampoConfig
  form: UseFormReturn<Record<string, any>>
  eventos: EventoOption[]
  propuestas: PropuestaOption[]
}) {
  const watchedValue = form.watch(campo.clave)

  // ── Radio ──
  if (campo.tipo === 'radio') {
    const options = getResolvedOptions(campo, eventos, propuestas)
    return (
      <Controller
        name={campo.clave}
        control={form.control}
        render={({ field, fieldState }) => (
          <FieldSet data-invalid={fieldState.invalid}>
            <FieldLegend variant='label'>
              {campo.etiqueta} {campo.obligatorio && <Req />}
            </FieldLegend>
            {campo.descripcion && (
              <FieldDescription>{campo.descripcion}</FieldDescription>
            )}
            <RadioGroup
              name={field.name}
              value={field.value}
              onValueChange={field.onChange}
              aria-invalid={fieldState.invalid}
            >
              {options.map((opt) => (
                <FieldLabel
                  key={opt.valor}
                  htmlFor={`f-${campo.clave}-${opt.valor}`}
                >
                  <Field orientation='horizontal'>
                    <RadioGroupItem
                      value={opt.valor}
                      id={`f-${campo.clave}-${opt.valor}`}
                    />
                    <FieldContent>
                      <FieldTitle>{opt.etiqueta}</FieldTitle>
                      {opt.descripcion && (
                        <FieldDescription>{opt.descripcion}</FieldDescription>
                      )}
                    </FieldContent>
                  </Field>
                </FieldLabel>
              ))}

              {campo.incluyeOpcionOtro && (
                <FieldLabel htmlFor={`f-${campo.clave}-otro`}>
                  <Field orientation='horizontal'>
                    <RadioGroupItem value='otro' id={`f-${campo.clave}-otro`} />
                    <FieldContent>
                      <FieldTitle>Otro</FieldTitle>
                    </FieldContent>
                  </Field>
                </FieldLabel>
              )}
            </RadioGroup>

            {campo.incluyeOpcionOtro && watchedValue === 'otro' && (
              <Controller
                name={`${campo.clave}_otro`}
                control={form.control}
                render={({ field: otroField, fieldState: otroState }) => (
                  <Field data-invalid={otroState.invalid} className='mt-2 ml-7'>
                    <Input
                      placeholder='Especificá...'
                      aria-invalid={otroState.invalid}
                      {...otroField}
                    />
                    {otroState.invalid && (
                      <FieldError errors={[otroState.error]} />
                    )}
                  </Field>
                )}
              />
            )}

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </FieldSet>
        )}
      />
    )
  }

  // ── Checkbox ──
  if (campo.tipo === 'checkbox') {
    const options = getResolvedOptions(campo, eventos, propuestas)
    return (
      <Controller
        name={campo.clave}
        control={form.control}
        render={({ field, fieldState }) => (
          <FieldSet>
            <FieldLegend variant='label'>
              {campo.etiqueta} {campo.obligatorio && <Req />}
            </FieldLegend>
            {campo.descripcion && (
              <FieldDescription>{campo.descripcion}</FieldDescription>
            )}
            <FieldGroup data-slot='checkbox-group'>
              {options.map((opt) => (
                <Field key={opt.valor} orientation='horizontal'>
                  <Checkbox
                    id={`f-${campo.clave}-${opt.valor}`}
                    name={field.name}
                    checked={field.value?.includes(opt.valor)}
                    onCheckedChange={(checked) => {
                      const current = field.value || []
                      const next = checked
                        ? [...current, opt.valor]
                        : current.filter((v: string) => v !== opt.valor)
                      field.onChange(next)
                    }}
                  />
                  <FieldContent>
                    <FieldLabel htmlFor={`f-${campo.clave}-${opt.valor}`}>
                      {opt.etiqueta}
                    </FieldLabel>
                    {opt.descripcion && (
                      <FieldDescription>{opt.descripcion}</FieldDescription>
                    )}
                  </FieldContent>
                </Field>
              ))}
            </FieldGroup>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </FieldSet>
        )}
      />
    )
  }

  // ── Textarea ──
  if (campo.tipo === 'textarea') {
    return (
      <Controller
        name={campo.clave}
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={`f-${campo.clave}`}>
              {campo.etiqueta} {campo.obligatorio && <Req />}
            </FieldLabel>
            <Textarea
              id={`f-${campo.clave}`}
              placeholder={campo.placeholder}
              rows={3}
              aria-invalid={fieldState.invalid}
              {...field}
            />
            {campo.descripcion && (
              <FieldDescription>{campo.descripcion}</FieldDescription>
            )}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    )
  }

  // ── Input: text, email, tel, number, date, time ──
  return (
    <Controller
      name={campo.clave}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={`f-${campo.clave}`}>
            {campo.etiqueta} {campo.obligatorio && <Req />}
          </FieldLabel>
          <Input
            id={`f-${campo.clave}`}
            type={campo.tipo}
            placeholder={campo.placeholder}
            aria-invalid={fieldState.invalid}
            {...(campo.tipo === 'number' ? { min: 1 } : {})}
            {...(['date', 'time'].includes(campo.tipo)
              ? { style: { colorScheme: 'dark' } }
              : {})}
            {...field}
          />
          {campo.descripcion && (
            <FieldDescription>{campo.descripcion}</FieldDescription>
          )}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}

// ---------------------------------------------------------------------------
// Main form component
// ---------------------------------------------------------------------------
export function FormPresupuesto({
  config,
  eventos = [],
  propuestas = [],
}: FormPresupuestoProps) {
  const [step, setStep] = React.useState(1)

  // Merge Sanity config with defaults — always have a working form
  const resolvedConfig = React.useMemo<FormConfig>(() => {
    if (!config || !config.camposPaso1 || config.camposPaso1.length === 0) {
      return DEFAULT_CONFIG
    }
    return config
  }, [config])

  const campos1 = resolvedConfig.camposPaso1 ?? []
  const campos2 = resolvedConfig.camposPaso2 ?? []

  // Stable key for memoization (avoids new array refs triggering useMemo)
  const configKey = React.useMemo(
    () =>
      JSON.stringify(
        campos1.map((c) => c.clave).concat(campos2.map((c) => c.clave)),
      ),
    [campos1, campos2],
  )

  // Build dynamic schema, defaults & required keys
  const { schema, defaults, step1Keys } = React.useMemo(() => {
    const shape1 = buildZodShape(campos1)
    const shape2 = buildZodShape(campos2)
    const s = z.object({ ...shape1, ...shape2 })
    const d = { ...buildDefaults(campos1), ...buildDefaults(campos2) }
    const keys = campos1.map((c) => c.clave)
    return { schema: s, defaults: d, step1Keys: keys }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configKey])

  const form = useForm<Record<string, any>>({
    resolver: zodResolver(schema),
    defaultValues: defaults,
  })

  // -- Navigation ---------------------------------------------------------
  async function goToStep2() {
    const valid = await form.trigger(step1Keys)

    let otroValid = true
    for (const campo of campos1) {
      if (campo.incluyeOpcionOtro && campo.obligatorio) {
        const val = form.getValues(campo.clave)
        if (val === 'otro') {
          const otroVal = form.getValues(`${campo.clave}_otro`)
          if (!otroVal || String(otroVal).trim() === '') {
            form.setError(`${campo.clave}_otro`, {
              type: 'manual',
              message: 'Especificá el valor',
            })
            otroValid = false
          }
        }
      }
    }

    if (valid && otroValid) {
      setStep(2)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function goToStep1() {
    setStep(1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // -- Submit -------------------------------------------------------------
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  async function onSubmit(data: Record<string, any>) {
    setIsSubmitting(true)
    try {
      // Armar mensaje de WhatsApp con TODOS los campos
      const lineas = [`Hola! Solicitud de presupuesto`, ``]

      for (const [key, value] of Object.entries(data)) {
        if (key.endsWith('_otro') || key === 'step') continue

        if (Array.isArray(value) && value.length > 0) {
          lineas.push(`${formatLabel(key)}: ${value.join(', ')}`)
        } else if (value && String(value).trim() !== '') {
          if (
            key === 'tipoEvento' &&
            value === 'otro' &&
            data.tipoEvento_otro
          ) {
            lineas.push(`${formatLabel(key)}: ${data.tipoEvento_otro}`)
          } else {
            lineas.push(`${formatLabel(key)}: ${value}`)
          }
        }
      }

      lineas.push(``, `Enviado desde apuraleña.com.ar/presupuesto`)

      const textoWA = encodeURIComponent(lineas.join('\n'))

      // Abrir WhatsApp primero
      window.open(`https://wa.me/5491139240988?text=${textoWA}`, '_blank')

      // Enviar email en background (no espera respuesta)
      fetch('/api/presupuesto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).catch(() => {})

      toast.success('¡Listo!', {
        description: 'Te redireccionamos a WhatsApp con tu solicitud.',
      })

      form.reset()
      setStep(1)
    } catch {
      toast.error('Hubo un error.', {
        description: 'Podés contactarnos directamente por WhatsApp.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  function formatLabel(key: string): string {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())
  }

  // -- Render fields with grouping & separators ---------------------------
  function renderFields(campos: CampoConfig[]) {
    const rows = groupFieldsByWidth(campos)

    return rows.map((row, rowIdx) => {
      const showSeparator = rowIdx < rows.length - 1

      if (row.length === 1) {
        return (
          <React.Fragment key={row[0]._key || row[0].clave}>
            <RenderCampo
              campo={row[0]}
              form={form}
              eventos={eventos}
              propuestas={propuestas}
            />
            {showSeparator && <FieldSeparator />}
          </React.Fragment>
        )
      }

      return (
        <React.Fragment key={row.map((c) => c._key || c.clave).join('-')}>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            {row.map((campo) => (
              <RenderCampo
                key={campo._key || campo.clave}
                campo={campo}
                form={form}
                eventos={eventos}
                propuestas={propuestas}
              />
            ))}
          </div>
          {showSeparator && <FieldSeparator />}
        </React.Fragment>
      )
    })
  }

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
      {/* ======================== STEP INDICATOR ======================== */}
      <div className='flex items-center gap-4 mb-2'>
        <div
          className={cn(
            'flex items-center gap-2 text-sm font-medium',
            step >= 1 ? 'text-orange-500' : 'text-white/40',
          )}
        >
          <span
            className={cn(
              'flex h-7 w-7 items-center justify-center rounded-full border text-xs font-bold',
              step > 1
                ? 'border-green-500/50 bg-green-500/10 text-green-400'
                : 'border-orange-500 bg-orange-500/10 text-orange-500',
            )}
          >
            {step > 1 ? '✓' : '1'}
          </span>
          <span className='hidden sm:inline'>
            {resolvedConfig.paso1Titulo || 'Paso 1'}
          </span>
        </div>

        <div className='flex-1 h-px bg-white/10' />

        <div
          className={cn(
            'flex items-center gap-2 text-sm font-medium',
            step === 2 ? 'text-orange-500' : 'text-white/40',
          )}
        >
          <span
            className={cn(
              'flex h-7 w-7 items-center justify-center rounded-full border text-xs font-bold',
              step === 2
                ? 'border-orange-500 bg-orange-500/10 text-orange-500'
                : 'border-white/20 text-white/40',
            )}
          >
            2
          </span>
          <span className='hidden sm:inline'>
            {resolvedConfig.paso2Titulo || 'Paso 2'}
          </span>
        </div>
      </div>

      {/* ======================== PASO 1 ======================== */}
      {step === 1 && (
        <FieldGroup>
          {resolvedConfig.paso1Subtitulo && (
            <p className='text-white/50 text-sm italic'>
              {resolvedConfig.paso1Subtitulo}
            </p>
          )}
          {renderFields(campos1)}
          {campos2.length > 0 && (
            <div className='flex justify-end pt-4'>
              <Button type='button' onClick={goToStep2}>
                {resolvedConfig.textoBotonSiguiente || 'Siguiente →'}
              </Button>
            </div>
          )}
          {campos2.length === 0 && (
            <div className='flex justify-end pt-4'>
              <Button type='submit' disabled={isSubmitting}>
                {isSubmitting
                  ? 'Enviando...'
                  : resolvedConfig.textoBotonEnviar || 'Enviar solicitud'}
              </Button>
            </div>
          )}
        </FieldGroup>
      )}

      {/* ======================== PASO 2 ======================== */}
      {step === 2 && (
        <FieldGroup>
          {resolvedConfig.paso2Subtitulo && (
            <p className='text-white/50 text-sm italic'>
              {resolvedConfig.paso2Subtitulo}
            </p>
          )}
          {renderFields(campos2)}
          <div className='flex justify-between pt-4'>
            <Button type='button' variant='outline' onClick={goToStep1}>
              {resolvedConfig.textoBotonVolver || '← Volver'}
            </Button>
            <Button type='submit' disabled={isSubmitting}>
              {isSubmitting
                ? 'Enviando...'
                : resolvedConfig.textoBotonEnviar || 'Enviar solicitud'}
            </Button>
          </div>
        </FieldGroup>
      )}
    </form>
  )
}
