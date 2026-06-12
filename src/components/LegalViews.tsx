import { SubPageType } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight, Shield, ScrollText, Cookie, AlertTriangle, Scale, User, Globe, Mail } from 'lucide-react';
import { useTranslation } from '../services/i18n';
import { developerConfig } from '../developer.config';

interface LegalViewsProps {
  activePage: SubPageType;
  onClose: () => void;
  onNavigate: (page: SubPageType) => void;
}

export default function LegalViews({ activePage, onClose, onNavigate }: LegalViewsProps) {
  const { t, lang } = useTranslation();

  if (!activePage) return null;

  // Language based Rendering Helpers
  const isPt = lang === 'pt-BR';
  const isEs = lang === 'es';

  const renderContent = () => {
    switch (activePage) {
      case 'privacy':
        if (isPt) {
          return (
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 text-slate-800 dark:text-zinc-300">
                <Shield className="h-6 w-6 text-emerald-500" />
                <h2 className="font-display text-xl sm:text-2xl font-bold dark:text-zinc-100">Política de Privacidade</h2>
              </div>
              <p className="text-zinc-650 dark:text-zinc-400 text-xs sm:text-sm font-semibold border-l-2 border-zinc-200 dark:border-zinc-800 pl-3 leading-relaxed">
                Última atualização: 12 de Junho de 2026. Este documento estabelece o compromisso absoluto com a segurança na navegação e transparência sob as diretrizes da LGPD (Lei 13.709/18) e boas práticas de privacidade digital.
              </p>
              <div className="space-y-5 text-xs sm:text-sm text-zinc-650 dark:text-zinc-400 leading-relaxed">
                <div className="rounded-xl bg-emerald-50/50 p-4 border border-emerald-100 dark:bg-emerald-950/10 dark:border-emerald-900/20">
                  <h4 className="font-bold text-xs text-emerald-800 dark:text-emerald-400 uppercase tracking-widest mb-1.5 font-mono">Resumo Executivo (Privacy by Design):</h4>
                  <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed font-medium">
                    Esta ferramenta é executada 100% no seu navegador de internet. Seus dados ou QR Codes não são transferidos, armazenados ou visualizados por servidores externos. Você detém a posse física e total sob cada informação digitada.
                  </p>
                </div>

                <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-200 uppercase tracking-wide mt-6">1. Coleta, Transmissão e Ausência de Servidores</h3>
                <p>
                  O gerador <strong>Bkappi QR Code</strong> atua exclusivamente em ambiente <em>client-side</em> (desconectado). Qualquer conteúdo inserido (sejam links, senhas de Wi-Fi, textos de SMS, números de telefone ou e-mails) é processado apenas na RAM temporária do seu navegador para gerar a estrutura geométrica rasterizada ou vetorial do QR Code. Não coletamos dados de tráfego, telemetria de formulário, e-mails de preenchimento ou dados de conteúdo.
                </p>
                
                <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-200 uppercase tracking-wide mt-6">2. Custódia do LocalStorage e Eliminação Direta</h3>
                <p>
                  Para propósitos de usabilidade, a aplicação salva o histórico de designs criados e sua lista de marcas favoritas localmente no seu dispositivo utilizando a API <strong>LocalStorage of HTML5</strong>. Estes dados permanecem confinados na sua máquina. Você pode destruí-los por completo a qualquer momento:
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-3">
                  <li>Clicando em <strong>"Wipe Local History" (Excluir Histórico)</strong> diretamente na interface do gerenciador;</li>
                  <li>Limpando os cookies, dados de site e o cache de armazenamento do seu navegador web.</li>
                </ul>
                
                <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-200 uppercase tracking-wide mt-6">3. Armazenamentos Técnicos Essenciais</h3>
                <p>
                  Não operamos nenhum software de rastreamento comportamental de publicidade cruzada, remarketing do Google Ads ou pixels do Facebook. As únicas preferências persistidas destinam-se exclusivamente para a operabilidade de layout: escolhas estéticas (modo claro/escuro) e flags de concordância do consentimento de cookies essenciais.
                </p>
                
                <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-200 uppercase tracking-wide mt-6">4. Direitos e Legislação (LGPD / GDPR)</h3>
                <p>
                  Cumprimos integralmente o direito à autodeterminação informativa. Visto que a plataforma não retém históricos, perfis ou identidades de usuários, o usuário detém controle total dos seus direitos à eliminação, retificação e confirmação de não tratamento em canais externos. Dúvidas regulatórias podem ser direcionadas a: <span className="font-mono text-zinc-800 dark:text-zinc-100 font-bold decoration-dotted underline">{developerConfig.email}</span>.
                </p>
              </div>
            </div>
          );
        } else if (isEs) {
          return (
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 text-slate-800 dark:text-zinc-300">
                <Shield className="h-6 w-6 text-emerald-500" />
                <h2 className="font-display text-xl sm:text-2xl font-bold dark:text-zinc-100">Política de Privacidad</h2>
              </div>
              <p className="text-zinc-650 dark:text-zinc-400 text-xs sm:text-sm font-semibold border-l-2 border-zinc-200 dark:border-zinc-800 pl-3 leading-relaxed">
                Última actualización: 12 de junio de 2026. Esta declaración establece nuestro compromiso absoluto con la transparencia, cumpliendo con la GDPR, la LGPD y las mejores prácticas de privacidad digital.
              </p>
              <div className="space-y-5 text-xs sm:text-sm text-zinc-650 dark:text-zinc-400 leading-relaxed">
                <div className="rounded-xl bg-emerald-50/50 p-4 border border-emerald-100 dark:bg-emerald-950/10 dark:border-emerald-900/20">
                  <h4 className="font-bold text-xs text-emerald-800 dark:text-emerald-400 uppercase tracking-widest mb-1.5 font-mono">Resumen Ejecutivo (Privacy by Design):</h4>
                  <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed font-medium">
                    Esta herramienta se ejecuta al 100% en su navegador local. Los datos ingresados para generar códigos QR nunca se transmiten, almacenan ni se procesan en servidores de terceros. Usted tiene control físico y exclusivo de su información.
                  </p>
                </div>

                <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-200 uppercase tracking-wide mt-6">1. Recopilación, Transmisión e Inexistencia de Servidores</h3>
                <p>
                  El generador <strong>Bkappi QR Code</strong> opera exclusivamente en el lado del cliente (desconectado). Cualquier contenido introducido (enlaces, contraseñas de red Wi-Fi, direcciones de correo, teléfonos, SMS o texto simple) se procesa localmente en la memoria de su navegador de forma temporal para calcular la matriz de puntos. El desarrollador no almacena, recopila ni tiene acceso a estos datos.
                </p>
                
                <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-200 uppercase tracking-wide mt-6">2. Custodia del LocalStorage y Eliminación Directa</h3>
                <p>
                  Para propósitos de usabilidad, guardamos su historial de códigos QR construidos y su lista de marcadores favoritos localmente en su propio dispositivo utilizando la API <strong>LocalStorage</strong> nativa de HTML5. Para destruir permanentemente toda esta información, simplemente realice cualquiera de las siguientes acciones:
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-3">
                  <li>Seleccionando <strong>"Wipe Local History" (Eliminar Historial)</strong> en el panel de historial de nuestra plataforma;</li>
                  <li>Limpiando los datos temporales del sitio, las cookies e historial dentro de los ajustes de su navegador web.</li>
                </ul>
                
                <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-200 uppercase tracking-wide mt-6">3. Almacenamientos Técnicos de Interfaz</h3>
                <p>
                  No empleamos scripts para anuncios personalizados Google Ads ni píxeles de Facebook para seguimiento cruzado. Únicamente se registran de forma temporal variables visuales o de interfaz como el tema gráfico (claro u oscuro) y el consentimiento del aviso de cookies funcionales.
                </p>

                <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-200 uppercase tracking-wide mt-6">4. Contacto y Consultas Jurídicas</h3>
                <p>
                  Para reclamaciones de autodeterminación informativa o resolver dudas legales sobre la protección de datos, escríbanos de forma directa a: <span className="font-mono text-zinc-800 dark:text-zinc-100 font-bold decoration-dotted underline">{developerConfig.email}</span>.
                </p>
              </div>
            </div>
          );
        } else {
          return (
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 text-slate-800 dark:text-zinc-300">
                <Shield className="h-6 w-6 text-emerald-500" />
                <h2 className="font-display text-xl sm:text-2xl font-bold dark:text-zinc-100">Privacy Policy</h2>
              </div>
              <p className="text-zinc-650 dark:text-zinc-400 text-xs sm:text-sm font-semibold border-l-2 border-zinc-200 dark:border-zinc-800 pl-3 leading-relaxed">
                Last updated: June 12, 2026. This declaration outlines our absolute commitment to transparency and compliance with GDPR, LGPD, and global digital privacy best practices.
              </p>
              <div className="space-y-5 text-xs sm:text-sm text-zinc-650 dark:text-zinc-400 leading-relaxed">
                <div className="rounded-xl bg-emerald-50/50 p-4 border border-emerald-100 dark:bg-emerald-950/10 dark:border-emerald-900/20">
                  <h4 className="font-bold text-xs text-emerald-800 dark:text-emerald-400 uppercase tracking-widest mb-1.5 font-mono">Executive Summary (Privacy by Design):</h4>
                  <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed font-medium">
                    This generator is executed 100% inside your client-side web browser. Your inputs and generated graphics are never loaded, shared, or sent to external servers. You maintain physical custody of all personal information.
                  </p>
                </div>

                <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-200 uppercase tracking-wide mt-6">1. Data Collection & Clientside-Only Process</h3>
                <p>
                  The <strong>Bkappi QR Code</strong> generator functions inside a sandboxed client-side setup. Any content filled inside the application (such as destination links, Wi-Fi passwords, emails, text messages, or phone numbers) is computed strictly in your local hardware memory (RAM) to build the custom matrix. No packet data or user telemetry is tracked or sent to our servers.
                </p>
                
                <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-200 uppercase tracking-wide mt-6">2. LocalStorage Custody and Manual Purging</h3>
                <p>
                  We store your generated designs, history timeline, and visual configurations inside your browser's **HTML5 LocalStorage** API. This information stays exclusively on your machine. You can remove all of it at any moment:
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-3">
                  <li>Clicking **"Wipe Local History"** within the History tab of the user interface;</li>
                  <li>Clearing cookies, local site data, and temporary cache in your browser's settings menu.</li>
                </ul>
                
                <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-200 uppercase tracking-wide mt-6">3. Technical Cookies</h3>
                <p>
                  We do not run tracking cookies, behavioral pixel trackers, profile builders, or target advertisements. The only variables saved physically are essential to coordinate the webpage's look, specifically saving your preferred color theme (Light / Dark mode), interface language preferences, and your banner consent acknowledgment.
                </p>

                <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-200 uppercase tracking-wide mt-6">4. Legal Inquiries & Contact</h3>
                <p>
                  For any privacy inquiries or regulatory concerns regarding LGPD/GDPR compliance, please email us directly at: <span className="font-mono text-zinc-800 dark:text-zinc-100 font-bold decoration-dotted underline">{developerConfig.email}</span>.
                </p>
              </div>
            </div>
          );
        }
      case 'cookies':
        if (isPt) {
          return (
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 text-slate-800 dark:text-zinc-300">
                <Cookie className="h-6 w-6 text-amber-500" />
                <h2 className="font-display text-xl sm:text-2xl font-bold dark:text-zinc-100">Política de Cookies</h2>
              </div>
              <p className="text-zinc-650 dark:text-zinc-400 text-xs sm:text-sm font-semibold border-l-2 border-zinc-200 dark:border-zinc-800 pl-3 leading-relaxed">
                Última atualização: 12 de Junho de 2026. Esta seção esclarece em detalhes técnicos a total ausência de cookies de rastreamento comercial e as tecnologias de persistências locais estritamente funcionais integradas no aplicativo.
              </p>
              <div className="space-y-4 text-xs sm:text-sm text-zinc-650 dark:text-zinc-400 leading-relaxed">
                <p>
                  Esta plataforma <strong>renuncia rigorosamente ao uso de cookies invasivos de remarketing de terceiros</strong>, rastreadores comportamentais de redes sociais e publicidade programática.
                </p>
                
                <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-200 uppercase tracking-wide mt-6">1. Chaves de Armazenamento Local Utilizadas</h3>
                <p>
                  O funcionamento ideal do design depende exclusivamente de persistências temporárias e de conveniência de layout salvas localmente no seu dispositivo. As chaves utilizadas de forma transparente são:
                </p>
                <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/20 my-3">
                  <table className="w-full text-left text-xs text-zinc-600 dark:text-zinc-400 border-collapse">
                    <thead>
                      <tr className="bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 font-bold text-zinc-700 dark:text-zinc-300">
                        <th className="p-3">Nome Técnico / Chave</th>
                        <th className="p-3">Categoria</th>
                        <th className="p-3">Duração</th>
                        <th className="p-3">Função / Utilidade</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-zinc-150 dark:border-zinc-850">
                        <td className="p-3 font-mono font-bold text-zinc-800 dark:text-zinc-200">bkappi_theme_pref</td>
                        <td className="p-3 font-semibold text-sky-600 dark:text-sky-400">Essencial / Funcional</td>
                        <td className="p-3">Persistente</td>
                        <td className="p-3">Evita oscilação de brilho lembrando sua escolha estética de tema (Claro ou Escuro).</td>
                      </tr>
                      <tr className="border-b border-zinc-150 dark:border-zinc-850">
                        <td className="p-3 font-mono font-bold text-zinc-800 dark:text-zinc-200">bkappi_cookie_consent</td>
                        <td className="p-3 font-semibold text-emerald-600 dark:text-emerald-400">Legitimidade Legal</td>
                        <td className="p-3">Persistente</td>
                        <td className="p-3">Evita a reexibição persistente do aviso legal e do consentimento em novas abas.</td>
                      </tr>
                      <tr className="border-b border-zinc-150 dark:border-zinc-850">
                        <td className="p-3 font-mono font-bold text-zinc-800 dark:text-zinc-200">bkappi_lang_pref</td>
                        <td className="p-3 font-semibold text-sky-600 dark:text-sky-400">Funcionalidade</td>
                        <td className="p-3">Persistente</td>
                        <td className="p-3">Salva qual idioma foi escolhido (Mapeados entre pt-BR, es, ou en).</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-bold text-zinc-800 dark:text-zinc-200">bkappi_qr_history</td>
                        <td className="p-3 font-semibold text-indigo-600 dark:text-indigo-400">Dados (LocalStorage)</td>
                        <td className="p-3">Controlado por você</td>
                        <td className="p-3">Estrutura compacta JSON mantendo seus códigos criados para re-customização imediata.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-200 uppercase tracking-wide mt-6">2. Controle e Gerenciamento pelo Usuário</h3>
                <p>
                  As preferências essenciais de navegação são totalmente controláveis por você. Você pode bloquear, recusar ou deletar essas persistências desativando a retenção de armazenamento de dados locais no painel de configurações ou ferramentas de desenvolvedor do seu próprio navegador. Em conformidade absoluta com as melhores práticas de cookies de primeiro nível (First-party cookies).
                </p>
              </div>
            </div>
          );
        } else if (isEs) {
          return (
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 text-slate-800 dark:text-zinc-300">
                <Cookie className="h-6 w-6 text-amber-500" />
                <h2 className="font-display text-xl sm:text-2xl font-bold dark:text-zinc-100">Política de Cookies</h2>
              </div>
              <p className="text-zinc-650 dark:text-zinc-400 text-xs sm:text-sm font-semibold border-l-2 border-zinc-200 dark:border-zinc-800 pl-3 leading-relaxed">
                Última actualización: 12 de junio de 2026. Esta sección describe de manera detallada nuestras políticas relativas a la ausencia de cookies de terceros y el uso ético del almacenamiento técnico local.
              </p>
              <div className="space-y-4 text-xs sm:text-sm text-zinc-650 dark:text-zinc-400 leading-relaxed">
                <p>
                  Esta aplicación **no implementa balizas web (web beacons) de publicidad personalizada**, herramientas de seguimiento de identidad cruzada de redes sociales ni scripts publicitarios intrusivos.
                </p>
                
                <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-200 uppercase tracking-wide mt-6">1. Parámetros Técnicos Utilizados</h3>
                <p>
                  Nuestros requisitos de navegación dependen únicamente del mantenimiento de parámetros de interfaz guardados localmente:
                </p>
                <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/20 my-3">
                  <table className="w-full text-left text-xs text-zinc-600 dark:text-zinc-400 border-collapse">
                    <thead>
                      <tr className="bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 font-bold text-zinc-700 dark:text-zinc-300">
                        <th className="p-3">Llave Técnica</th>
                        <th className="p-3">Categoría</th>
                        <th className="p-3">Duración</th>
                        <th className="p-3">Propósito Principal</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-zinc-150 dark:border-zinc-850">
                        <td className="p-3 font-mono font-bold text-zinc-800 dark:text-zinc-200">bkappi_theme_pref</td>
                        <td className="p-3 font-semibold text-sky-600 dark:text-sky-400">Esencial / Interfaz</td>
                        <td className="p-3">Permanente</td>
                        <td className="p-3">Memoriza su elección estética entre tema claro y tema oscuro para evitar destellos.</td>
                      </tr>
                      <tr className="border-b border-zinc-150 dark:border-zinc-850">
                        <td className="p-3 font-mono font-bold text-zinc-800 dark:text-zinc-200">bkappi_cookie_consent</td>
                        <td className="p-3 font-semibold text-emerald-600 dark:text-emerald-400">Consentimiento Legal</td>
                        <td className="p-3">Permanente</td>
                        <td className="p-3">Registra que el usuario ya leyó e interactuó con el banner legal para ocultarlo en el futuro.</td>
                      </tr>
                      <tr className="border-b border-zinc-150 dark:border-zinc-850">
                        <td className="p-3 font-mono font-bold text-zinc-800 dark:text-zinc-200">bkappi_lang_pref</td>
                        <td className="p-3 font-semibold text-sky-600 dark:text-sky-400">Funcionalidad</td>
                        <td className="p-3">Permanente</td>
                        <td className="p-3">Guarda su idioma preferido para adaptar las tipografías y textos explicativos automáticamente.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-bold text-zinc-800 dark:text-zinc-200">bkappi_qr_history</td>
                        <td className="p-3 font-semibold text-indigo-600 dark:text-indigo-400">Estructura de Datos</td>
                        <td className="p-3">Bajo su control</td>
                        <td className="p-3">Almacena sus presets locales en formato compatible con el motor de renderizado.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-200 uppercase tracking-wide mt-6">2. Desactivación de Preferencias</h3>
                <p>
                  Puede impedir o revocar el uso de estos archivos técnicos configurando los niveles de privacidad y cookies de su navegador. Tenga en cuenta que, si borra o bloquea por completo el localStorage, perderá el acceso a sus presets guardados y su historial local.
                </p>
              </div>
            </div>
          );
        } else {
          return (
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 text-slate-800 dark:text-zinc-300">
                <Cookie className="h-6 w-6 text-amber-500" />
                <h2 className="font-display text-xl sm:text-2xl font-bold dark:text-zinc-100">Cookie & Local Storage Policy</h2>
              </div>
              <p className="text-zinc-650 dark:text-zinc-400 text-xs sm:text-sm font-semibold border-l-2 border-zinc-200 dark:border-zinc-800 pl-3 leading-relaxed">
                Last updated: June 12, 2026. This section clarifies technical local storage persistence structures, confirming the absence of commercial third-party trackers.
              </p>
              <div className="space-y-4 text-xs sm:text-sm text-zinc-650 dark:text-zinc-400 leading-relaxed">
                <p>
                  Our platform **intentionally rejects cross-site profiling trackers, ad network pixels (Google/Facebook/Tiktok), and targeted web beacons.** We believe in absolute local clarity.
                </p>
                
                <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-200 uppercase tracking-wide mt-6">1. Technical Keys We Use</h3>
                <p>
                  Optimal interface and app behavior rely exclusively on standard visual preferences saved on your machine:
                </p>
                <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/20 my-3">
                  <table className="w-full text-left text-xs text-zinc-600 dark:text-zinc-400 border-collapse">
                    <thead>
                      <tr className="bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 font-bold text-zinc-700 dark:text-zinc-300">
                        <th className="p-3">Key Name</th>
                        <th className="p-3">Category</th>
                        <th className="p-3">Duration</th>
                        <th className="p-3">Main Utility</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-zinc-150 dark:border-zinc-850">
                        <td className="p-3 font-mono font-bold text-zinc-800 dark:text-zinc-200">bkappi_theme_pref</td>
                        <td className="p-3 font-semibold text-sky-600 dark:text-sky-400">Essential / UI</td>
                        <td className="p-3">Persistent</td>
                        <td className="p-3">Prevents blinding transitions by remembering block style choices (Light / Dark mode).</td>
                      </tr>
                      <tr className="border-b border-zinc-150 dark:border-zinc-850">
                        <td className="p-3 font-mono font-bold text-zinc-800 dark:text-zinc-200">bkappi_cookie_consent</td>
                        <td className="p-3 font-semibold text-emerald-600 dark:text-emerald-400">Legitimacy</td>
                        <td className="p-3">Persistent</td>
                        <td className="p-3">Instructs the platform that you have reviewed cookies parameters, and disables the floating bar.</td>
                      </tr>
                      <tr className="border-b border-zinc-150 dark:border-zinc-850">
                        <td className="p-3 font-mono font-bold text-zinc-800 dark:text-zinc-200">bkappi_lang_pref</td>
                        <td className="p-3 font-semibold text-sky-600 dark:text-sky-400">Functional</td>
                        <td className="p-3">Persistent</td>
                        <td className="p-3">Locally persists selected locale (among pt-BR, es, or en) to map translations instantly.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-bold text-zinc-800 dark:text-zinc-200">bkappi_qr_history</td>
                        <td className="p-3 font-semibold text-indigo-600 dark:text-indigo-400">User Data (LocalStorage)</td>
                        <td className="p-3">User Controlled</td>
                        <td className="p-3">Stores your QR configurations in browser storage to enable easy design re-renders.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-200 uppercase tracking-wide mt-6">2. Management and Erasure</h3>
                <p>
                  You are fully empowered to manage or delete these keys by clearing your cookies and browser memory. Disabling LocalStorage altogether may limit access to your history catalog.
                </p>
              </div>
            </div>
          );
        }
      case 'terms':
        if (isPt) {
          return (
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 text-slate-800 dark:text-zinc-300">
                <ScrollText className="h-6 w-6 text-zinc-500" />
                <h2 className="font-display text-xl sm:text-2xl font-bold dark:text-zinc-100">Termos e Condições de Uso</h2>
              </div>
              <p className="text-zinc-650 dark:text-zinc-400 text-xs sm:text-sm font-semibold border-l-2 border-zinc-200 dark:border-zinc-800 pl-3 leading-relaxed">
                Última atualização: 12 de Junho de 2026. Ao ler e interagir com este software de processamento gráfico de dados offline, você manifesta sua integral concordância com estes termos.
              </p>
              <div className="space-y-4 text-xs sm:text-sm text-zinc-650 dark:text-zinc-400 leading-relaxed">
                <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-200 uppercase tracking-wide mt-6">1. Licença Permissiva</h3>
                <p>
                  Permitimos o uso do gerador <strong>Bkappi QR Code</strong> de forma inteiramente gratuita, tanto para destinações civis de caráter privado quanto atividades e frentes estritamente comerciais. Você detém a propriedade irrestrita sobre as imagens geradas, sem necessidade de pagamento ou atribuições obrigatórias de licença ou marcas de royalties da plataforma.
                </p>
                
                <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-200 uppercase tracking-wide mt-6">2. Proibições e Atividades Abusivas</h3>
                <p>
                  Esta é uma plataforma livre, porém não toleramos abusos. Fica estritamente vedada a utilização do gerador com intuito de enganar cidadãos sob as seguintes condutas:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-3">
                  <li>Codificação de links para páginas maliciosas, espionagem industrial ou roubo de dados pessoais (esquemas de <strong>phishing</strong>);</li>
                  <li>Atalhos visuais para disseminar malware, ransomware, botnets ou vírus de computador;</li>
                  <li>Indução de usuários a transações de engenharia social, fraudes financeiras e golpes digitais de qualquer natureza;</li>
                  <li>Mapeamento de conteúdos abusivos, ilegais ou violentos.</li>
                </ul>

                <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-200 uppercase tracking-wide mt-6">3. Operação sob Modelo "As-Is" (Como se Encontra)</h3>
                <p>
                  O aplicativo é entregue gratuitamente **"como está"**, sem garantias implícitas ou explícitas de escaneabilidade irrestrita, adequação para uso particular específico de marketing ou uptime infinito. As regras físicas de contraste e compactação de caracteres determinam o desempenho prático de scanners obsoletos. O proprietário da ferramenta isenta-se de prejuízos operacionais decorrentes de uso inadequado ou falhas sob navegadores de internet.
                </p>
              </div>
            </div>
          );
        } else if (isEs) {
          return (
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 text-slate-800 dark:text-zinc-300">
                <ScrollText className="h-6 w-6 text-zinc-500" />
                <h2 className="font-display text-xl sm:text-2xl font-bold dark:text-zinc-100">Términos y Condiciones de Uso</h2>
              </div>
              <p className="text-zinc-650 dark:text-zinc-400 text-xs sm:text-sm font-semibold border-l-2 border-zinc-200 dark:border-zinc-800 pl-3 leading-relaxed">
                Última actualización: 12 de junio de 2026. Al utilizar las funciones de nuestra suite, usted acepta plenamente este reglamento de uso.
              </p>
              <div className="space-y-4 text-xs sm:text-sm text-zinc-650 dark:text-zinc-400 leading-relaxed">
                <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-200 uppercase tracking-wide mt-6">1. Licencia de Uso Permitido</h3>
                <p>
                  Se concede permiso gratuito y universal para generar, modificar y distribuir diseños de código QR para fines comerciales y no comerciales. No se requiere mencionar la procedencia geográfica o el nombre del desarrollador en el uso del material final.
                </p>
                
                <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-200 uppercase tracking-wide mt-6">2. Restricciones e Infracciones</h3>
                <p>
                  Bajo ningún concepto se permitirá codificar o encriptar contenidos que asistan en acciones delictivas, tales como:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-3">
                  <li>Páginas fraudulentas destinadas al robo de credenciales o estafas interbancarias (<strong>phishing</strong>);</li>
                  <li>Descargas forzosas de virus informáticos o malware dirigidos a vulnerabilidades en smartphones;</li>
                  <li>Iniciativas coordinadas para hostigamiento o promoción de violencia;</li>
                  <li>Suplantaciones de marcas registradas con fines de engaño.</li>
                </ul>

                <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-200 uppercase tracking-wide mt-6">3. Garantía y Exclusiones</h3>
                <p>
                  El software Bkappi QR Code se ofrece **"tal como está"**, sin soporte de conectividad o garantías de lectura en aparatos telefónicos antiguos con cámaras de baja resolución. Usted asume los riesgos del rendimiento de contraste y configuración visual de pixeles escogidos.
                </p>
              </div>
            </div>
          );
        } else {
          return (
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 text-slate-800 dark:text-zinc-300">
                <ScrollText className="h-6 w-6 text-zinc-500" />
                <h2 className="font-display text-xl sm:text-2xl font-bold dark:text-zinc-100">Terms & Conditions of Use</h2>
              </div>
              <p className="text-zinc-650 dark:text-zinc-400 text-xs sm:text-sm font-semibold border-l-2 border-zinc-200 dark:border-zinc-800 pl-3 leading-relaxed">
                Last updated: June 12, 2026. Accessing and utilizing our client-side software signifies your total consent and agreement to these conditions.
              </p>
              <div className="space-y-4 text-xs sm:text-sm text-zinc-650 dark:text-zinc-400 leading-relaxed">
                <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-200 uppercase tracking-wide mt-6">1. Free Usage License</h3>
                <p>
                  We grant an unrestricted, zero-cost, worldwide license to produce and customize QR Codes for private use or broad commercial operations. All exported materials belong to you, without forcing royalty obligations, attribution, or branding requirements.
                </p>
                
                <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-200 uppercase tracking-wide mt-6">2. Strictly Prohibited Conduct</h3>
                <p>
                  You may not coordinate use of the encoder to orchestrate or assist in any of the following offenses:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-3">
                  <li>Building pathways direction to fraudulent login portals, scams, or information theft (<strong>phishing</strong> campaigns);</li>
                  <li>Distributing malicious computer files, payloads, spyware, or ransomware;</li>
                  <li>Engaging in financial fraud, social engineering tricks, or deceptive scams;</li>
                  <li>Spreading dangerous, illegal, or hate-promoting materials.</li>
                </ul>

                <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-200 uppercase tracking-wide mt-6">3. Provided "As-Is" Disclaimer</h3>
                <p>
                  The utility is prepared and compiled purely **"as-is"**, without implied or express warranties of compatibility with older camera scanners or server uptime. Scannability performance rests on pixel choice, safe margins, and error correction levels selected locally by the user.
                </p>
              </div>
            </div>
          );
        }
      case 'legal':
        if (isPt) {
          return (
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 text-slate-800 dark:text-zinc-300">
                <AlertTriangle className="h-6 w-6 text-amber-500" />
                <h2 className="font-display text-xl sm:text-2xl font-bold dark:text-zinc-100">Aviso Legal (Disclaimer)</h2>
              </div>
              <p className="text-zinc-650 dark:text-zinc-400 text-xs sm:text-sm font-semibold border-l-2 border-zinc-200 dark:border-zinc-800 pl-3 leading-relaxed">
                Última atualização: 12 de Junho de 2026. Esta declaração define e delimita a natureza técnica do empacotador de dados do gerador sob a égide legal.
              </p>
              <div className="space-y-4 text-xs sm:text-sm text-zinc-650 dark:text-zinc-400 leading-relaxed">
                <p>
                  O utilitário **Bkappi QR Code** opera única e exclusivamente como gerador de matriz bi-dimensional gráfica estática convertendo strings arbítrias fornecidas pelo usuário em padrões gráficos universais de códigos de barras (QR Code).
                </p>
                
                <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-200 uppercase tracking-wide mt-6">1. Ausência de Controle e Moderação Prévios</h3>
                <p>
                  Por funcionar inteiramente desprovido de bancos de dados ou processamento em nuvem centralizado, as criações geradas <strong>não são avaliadas, validadas, revisadas, catalogadas ou inspecionadas por nossa equipe.</strong> O destino final do link traduzido e o seu impacto na jornada dos destinatários são de incumbência única e inviolável do usuário que originou o gráfico.
                </p>
                
                <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-200 uppercase tracking-wide mt-6">2. Isenção Jurídica de Afiliados de Marcas</h3>
                <p>
                  A interface disponibiliza logotipos, ícones populares ou formatos inspirados em empresas terceiras (tais como WhatsApp, Instagram, Google, Facebook ou LinkedIn) para auxiliar no refinamento de design sob as leis de <strong>"Uso Justo" (Fair Use)</strong> de fins estritamente corporativos e de conveniência. O uso e inserção destas imagens representam ato independente do usuário, sem que constitua qualquer modalidade de contrato comercial, parceria de representação, filiação legal, patrocínio outorgado ou apoio recíproco das respectivas detentoras das marcas para com este gerador.
                </p>

                <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-200 uppercase tracking-wide mt-6">3. Desconexão de Links Externos</h3>
                <p>
                  Não nos responsabilizamos pela disponibilidade, alteração posterior de domínio, quedas do servidor receptor, expiração de endereços ou roubo de DNS que possam vir a ocorrer nos links inseridos pelos usuários a qualquer tempo no futuro.
                </p>
              </div>
            </div>
          );
        } else if (isEs) {
          return (
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 text-slate-800 dark:text-zinc-300">
                <AlertTriangle className="h-6 w-6 text-amber-500" />
                <h2 className="font-display text-xl sm:text-2xl font-bold dark:text-zinc-100">Aviso Legal</h2>
              </div>
              <p className="text-zinc-650 dark:text-zinc-400 text-xs sm:text-sm font-semibold border-l-2 border-zinc-200 dark:border-zinc-800 pl-3 leading-relaxed">
                Última actualización: 12 de junio de 2026. Esta cláusula detalla la naturaleza de empaquetado gráfico local de nuestra herramienta en conformidad con regulaciones web.
              </p>
              <div className="space-y-4 text-xs sm:text-sm text-zinc-650 dark:text-zinc-400 leading-relaxed">
                <p>
                  El software de **Bkappi QR Code** cumple la función exclusiva de codificador geométrico de información en formato visual bidimensional (matriz matricial estándar).
                </p>
                
                <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-200 uppercase tracking-wide mt-6">1. Falta de Filtrado y Control</h3>
                <p>
                  Al no poseer servidores centrales dedicados al almacenamiento de datos, <strong>los enlaces o destinos generados no se monitorizan preliminarmente de ninguna forma.</strong> El emisor y utilizador del código asume íntegra y de manera exclusiva la responsabilidad del contenido destino final.
                </p>
                
                <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-200 uppercase tracking-wide mt-6">2. Desvinculación de Marcas Registradas</h3>
                <p>
                  La inclusión opcional o integración de iconos referenciales inspirados en consorcios de telecomunicaciones o redes sociales (Instagram, WhatsApp, etc.) se apoya bajo políticas internacionales de **uso razonable de marcas (fair use)** corporativas. Esto no supone representaciones comerciales formales, afiliación, patrocinio, franquiciado o cooperación legal alguna entre este proyecto y las respectivas sociedades mercantiles titulares de tales registros.
                </p>

                <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-200 uppercase tracking-wide mt-6">3. Caída de Enlaces e Hipervínculos</h3>
                <p>
                  No responderemos bajo ningún aspecto técnico si los dominios cargados por el usuario final expiran, son modificados o redirigen en el futuro a direcciones distintas de las programadas en el momento visual inicial de renderización.
                </p>
              </div>
            </div>
          );
        } else {
          return (
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 text-slate-800 dark:text-zinc-300">
                <AlertTriangle className="h-6 w-6 text-amber-500" />
                <h2 className="font-display text-xl sm:text-2xl font-bold dark:text-zinc-100">Legal Disclaimer</h2>
              </div>
              <p className="text-zinc-650 dark:text-zinc-400 text-xs sm:text-sm font-semibold border-l-2 border-zinc-200 dark:border-zinc-800 pl-3 leading-relaxed">
                Last updated: June 12, 2026. This notice outlines the specific technical and legal boundaries governing our offline-first generator utility.
              </p>
              <div className="space-y-4 text-xs sm:text-sm text-zinc-650 dark:text-zinc-400 leading-relaxed">
                <p>
                  The utility **Bkappi QR Code** functions strictly as a client-side visual encoder transforming custom user-supplied text strings into universal 2D barcode patterns.
                </p>
                
                <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-200 uppercase tracking-wide mt-6">1. Total Absence of Prior Moderation or Auditing</h3>
                <p>
                  Because this code compiles and processes entirely offline on the user's browser, <strong>no generated codes are reviewed, filtered, stored, or inspected before distribution.</strong> The targets, destinations, and functional payloads remain under the sole and exclusive legal liability of the printing or sharing user.
                </p>
                
                <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-200 uppercase tracking-wide mt-6">2. Fair Use & Trademark Disclaimer</h3>
                <p>
                  Any corporate logo formats (like WhatsApp, Instagram, LinkedIn, Google, or Facebook) are introduced purely for descriptive styling purposes and user customization in accordance with international **"Fair Use" guidelines**. Their inclusion does not suggest, claim, or represent any commercial affiliation, endorsement, legal partnership, sponsorship, or licensing permission of those corporations for with Bkappi / Bruno Bkappi.
                </p>

                <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-200 uppercase tracking-wide mt-6">3. Subsequent Link Failures</h3>
                <p>
                  We are not responsible if any destination domain compiled inside a QR Code changes owners, expires, or suffers from host network failure.
                </p>
              </div>
            </div>
          );
        }
      case 'responsibility':
        if (isPt) {
          return (
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 text-slate-800 dark:text-zinc-300">
                <Scale className="h-6 w-6 text-indigo-500" />
                <h2 className="font-display text-xl sm:text-2xl font-bold dark:text-zinc-100">Politica de Responsabilidade de Leitura e Impressão</h2>
              </div>
              <p className="text-zinc-650 dark:text-zinc-400 text-xs sm:text-sm font-semibold border-l-2 border-zinc-200 dark:border-zinc-800 pl-3 leading-relaxed">
                Última atualização: 12 de Junho de 2026. Esta política estabelece de forma impositiva as exigências de testes prévios para evitar perdas logísticas e problemas de compatibilidade física.
              </p>
              <div className="space-y-5 text-xs sm:text-sm text-zinc-650 dark:text-zinc-400 leading-relaxed">
                <div className="rounded-xl bg-amber-50/50 p-4 border border-amber-200/30 dark:bg-amber-950/10 dark:border-amber-900/20">
                  <h4 className="font-bold text-xs text-amber-800 dark:text-amber-400 uppercase tracking-widest mb-1 font-mono">⚠️ Mandato de Teste Físico Obrigatório:</h4>
                  <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed font-semibold">
                    Em nenhuma circunstância envie arquivos gerados para gráficas em massa antes de realizar escaneamentos testes nas dimensões reais do material final. Diferentes papéis, reflexividade e lentes determinam a taxa de captura física.
                  </p>
                </div>

                <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-200 uppercase tracking-wide mt-6">1. Fatores de Risco no Design do QR Code</h3>
                <p>
                  O gerador oferece liberdade extrema de customização artística de cores, gradientes, formatos de pixels e adição de marcas d'água de logotipo centralizado. Contudo, modificações severas trazem riscos de física visual que fogem do controle do sistema. O usuário declara compreender que:
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-3">
                  <li><strong>Contraste Cromático Insuficiente:</strong> Gradientes ou pixels muito claros em fundo branco (ou vice-versa) impedem o sensor da câmera de mapear os pontos sob luz solar ou ambientes escuros;</li>
                  <li><strong>Safe Margin Apertada:</strong> Remover a margem de respiração (zona de respiro livre) dificulta o enquadramento em câmeras de foco lento ou sob ângulos inclinados;</li>
                  <li><strong>Entupimento Geométrico:</strong> Adicionar logotipos centrais sem Safe Zone (remover os pontos de fundo) mescla as geometrias fundamentais do QR Code destruindo a legibilidade estrutural;</li>
                  <li><strong>Tipagem Redonda de Pontos:</strong> Formatos de círculos muito pequenos alteram a silhueta das trilhas de rastreio e decodificação analógica do padrão.</li>
                </ul>

                <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-200 uppercase tracking-wide mt-6">2. Isenção Completa Comparativa Financeira</h3>
                <p>
                  O desenvolvedor (Bkappi / Bruno Bkappi) **exime-se de toda e qualquer indenização, reembolso financeiro ou custos operacionais de marketing por lotes impressos inutilizados** (como embalagens comerciais de alimentos, adesivos personalizados, outdoors, panfletos impressos ou faturas e recibos de cobranças em massa) decorrentes de erros de codificação ou deficiências na digitalização. É sua responsabilidade testar e garantir compatibilidade.
                </p>
              </div>
            </div>
          );
        } else if (isEs) {
          return (
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 text-slate-800 dark:text-zinc-300">
                <Scale className="h-6 w-6 text-indigo-500" />
                <h2 className="font-display text-xl sm:text-2xl font-bold dark:text-zinc-100">Política de Responsabilidad de Lectura e Impresión</h2>
              </div>
              <p className="text-zinc-650 dark:text-zinc-400 text-xs sm:text-sm font-semibold border-l-2 border-zinc-200 dark:border-zinc-800 pl-3 leading-relaxed">
                Última actualización: 12 de junio de 2026. Esta declaración establece directrices imperativas para evitar pérdidas financieras vinculadas con impresiones de códigos no legibles.
              </p>
              <div className="space-y-5 text-xs sm:text-sm text-zinc-650 dark:text-zinc-400 leading-relaxed">
                <div className="rounded-xl bg-amber-50/50 p-4 border border-amber-200/30 dark:bg-amber-950/10 dark:border-amber-900/20">
                  <h4 className="font-bold text-xs text-amber-800 dark:text-amber-400 uppercase tracking-widest mb-1 font-mono">⚠️ Mandato de Prueba de Escaneo Físico:</h4>
                  <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed font-semibold">
                    OBLIGATORIO: Pruebe físicamente el escaneo del patrón en el tamaño y formato final antes de ordenar producciones masivas. Los relieves del papel y reflejos determinan el funcionamiento del descifrado móvil.
                  </p>
                </div>

                <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-200 uppercase tracking-wide mt-6">1. Parámetros Críticos del Diseño Geométrico</h3>
                <p>
                  Las funciones estéticas permiten personalizar colores y logos. No obstante, las alteraciones físicas excesivas conllevan riesgos importantes de legibilidad de los cuales el usuario es consciente:
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-3">
                  <li><strong>Contraste cromático inadecuado:</strong> Los tonos pixelares claros sobre fondo blanco imposibilitan el autoenfoque del móvil;</li>
                  <li><strong>Margen de seguridad insuficiente:</strong> Remover el espacio de respiro exterior ralentiza y dificulta la detección del escaneo;</li>
                  <li><strong>Solapamiento con logotipos centrales:</strong> Insertar logos de gran tamaño sin activar la zona de seguridad borra componentes críticos de restauración;</li>
                  <li><strong>Formas circulares o fluidas:</strong> Los nodos redondeados extremos limitan la velocidad del procesamiento.</li>
                </ul>

                <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-200 uppercase tracking-wide mt-6">2. Exclusión de Responsabilidad por Pérdidas Gráficas</h3>
                <p>
                  El creador de la plataforma queda **completamente eximido de cualquier reclamo por pérdidas de marketing, costos de publicidad gráfica o empaques inutilizados** debido a códigos no escaneables. El usuario asume el deber del testeo riguroso preliminar.
                </p>
              </div>
            </div>
          );
        } else {
          return (
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 text-slate-800 dark:text-zinc-300">
                <Scale className="h-6 w-6 text-indigo-500" />
                <h2 className="font-display text-xl sm:text-2xl font-bold dark:text-zinc-100">Responsibility & Printing Guard Policy</h2>
              </div>
              <p className="text-zinc-650 dark:text-zinc-400 text-xs sm:text-sm font-semibold border-l-2 border-zinc-200 dark:border-zinc-800 pl-3 leading-relaxed">
                Last updated: June 12, 2026. This policy establishes the compulsory testing guidelines required to secure your physical printing operations against digital failure.
              </p>
              <div className="space-y-5 text-xs sm:text-sm text-zinc-650 dark:text-zinc-400 leading-relaxed">
                <div className="rounded-xl bg-amber-50/50 p-4 border border-amber-200/30 dark:bg-amber-950/10 dark:border-amber-900/20">
                  <h4 className="font-bold text-xs text-amber-800 dark:text-amber-400 uppercase tracking-widest mb-1 font-mono">⚠️ Mandatory Physical Test Mandate:</h4>
                  <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed font-semibold">
                    COMPULSORY: Verify scanning outputs under diverse mobile phone lenses and ambient lighting setups in final printed scale before bulk manufacturing or flyer printing.
                  </p>
                </div>

                <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-200 uppercase tracking-wide mt-6">1. Physical Risk Factors in QR Customizations</h3>
                <p>
                  Advanced features let you styling shapes and hues freely. However, extreme modifications disrupt scanning compliance. The user understands that:
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-3">
                  <li><strong>Insufficient Contrast Scales:</strong> Light pixels on plain margins disable camera sensors from mapping the barcode;</li>
                  <li><strong>Insufficient Quiet Margins (Safe breathing zone):</strong> Shrinking the border radius frame degrades angled scan processing;</li>
                  <li><strong>Logo Center Encroachment:</strong> Placing central images without excluding backdrop points destroys essential parity correction blocks;</li>
                  <li><strong>Extremely Rounded dots:</strong> Small circular patterns limit recovery algorithms from resolving coordinates.</li>
                </ul>

                <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-200 uppercase tracking-wide mt-6">2. Zero Printing-Cost Responsibility Clause</h3>
                <p>
                  The developer (Bkappi / Bruno Bkappi) is **entirely harmless and void of any financial liability, printing costs, marketing losses, or logistics adjustments** for non-scannable graphics/codes on physical packaging, commercial collateral, or massive signs. Absolute scanning verification is of your singular ownership.
                </p>
              </div>
            </div>
          );
        }
      case 'developer':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2.5 text-slate-800 dark:text-zinc-300">
              <User className="h-6 w-6 text-zinc-650" />
              <h2 className="font-display text-xl sm:text-2xl font-bold dark:text-zinc-100">{t('common.aboutDeveloper')}</h2>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start border border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/30 rounded-xl p-5 mt-4">
              <div className="relative h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-full border-2 border-zinc-200 dark:border-zinc-800 bg-white shrink-0 flex items-center justify-center">
                <img 
                  src={developerConfig.profilePictureUrl} 
                  alt={developerConfig.name} 
                  className="h-full w-full object-cover animate-none"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://cdn.bkappi.com/ProjectsAssets/BkappiGeneral/bkappiIcon.ico';
                  }}
                />
              </div>
              
              <div className="flex-1 text-center sm:text-left space-y-2">
                <h3 className="font-display text-lg font-bold text-zinc-900 dark:text-zinc-100">{developerConfig.name}</h3>
                <p className="text-xs text-zinc-550 dark:text-zinc-400 font-bold tracking-wide">
                  {isPt ? developerConfig.role.pt : isEs ? developerConfig.role.es : developerConfig.role.en}
                </p>
                <p className="text-xs sm:text-sm text-zinc-650 dark:text-zinc-400 leading-relaxed font-normal">
                  {isPt ? developerConfig.description.pt : isEs ? developerConfig.description.es : developerConfig.description.en}
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2">
                  <span className="flex items-center gap-1.5 text-[11px] font-bold text-zinc-500 dark:text-zinc-400">
                    <Globe className="h-3.5 w-3.5 text-zinc-400" /> {isPt ? developerConfig.location.pt : isEs ? developerConfig.location.es : developerConfig.location.en}
                  </span>
                  <a 
                    href={`mailto:${developerConfig.email}`}
                    className="flex items-center gap-1.5 text-[11px] font-bold text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors"
                  >
                    <Mail className="h-3.5 w-3.5 text-zinc-400" /> {developerConfig.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-100 dark:border-zinc-900">
              <div className="text-center sm:text-left">
                <p className="text-xs font-bold text-zinc-800 dark:text-zinc-300">{isPt ? 'Conheça o portfólio completo' : isEs ? 'Ver portafolio de proyectos' : 'Browse complete portfolio'}</p>
                <p className="text-[10px] text-zinc-400 dark:text-zinc-500">{isPt ? 'Veja outros projetos, biografia e contatos.' : isEs ? 'Ver proyectos adicionales y biografías.' : 'Access key projects, developer biography and connection boards.'}</p>
              </div>
              <a 
                href={developerConfig.portfolioUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-black px-4.5 py-2 text-xs font-bold text-white transition-opacity hover:opacity-90 active:scale-95 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-900 cursor-pointer"
                id="developer-portfolio-link"
              >
                {isPt ? 'Acessar portfólio.bkappi.com' : isEs ? 'Visitar portafolio.bkappi.com' : 'Open portfolio.bkappi.com'}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const navItems = [
    { id: 'privacy', label: t('common.privacyPolicy'), icon: Shield },
    { id: 'cookies', label: t('common.cookiePolicy'), icon: Cookie },
    { id: 'terms', label: t('common.termsOfUse'), icon: ScrollText },
    { id: 'legal', label: t('common.legalNotice'), icon: AlertTriangle },
    { id: 'responsibility', label: t('common.responsibility'), icon: Scale },
    { id: 'developer', label: t('common.aboutDeveloper'), icon: User },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/70 p-4 sm:p-6 backdrop-blur-md"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ cubicBezier: [0.16, 1, 0.3, 1], duration: 0.4 }}
          className="relative flex h-full max-h-[85vh] w-full max-w-4xl flex-col rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950 overflow-hidden"
        >
          {/* Header row inside popup container */}
          <div className="flex h-14 items-center justify-between border-b border-zinc-100 px-6 dark:border-zinc-900">
            <span className="font-display text-[11px] font-bold tracking-wider text-zinc-450 dark:text-zinc-500 uppercase">
              Bkappi QR Code — {isPt ? 'Institucional' : isEs ? 'Institucional' : 'Information Center'}
            </span>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:border-zinc-800 dark:hover:bg-zinc-900 dark:hover:text-zinc-300"
              id="close-legal-modal-btn"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar navigation */}
            <div className="hidden md:flex w-56 flex-col border-r border-zinc-200/60 p-4 space-y-1 dark:border-zinc-800/80 bg-zinc-50/20 dark:bg-zinc-950">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isSelected = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id as SubPageType)}
                    className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-bold transition-all cursor-pointer text-left ${
                      isSelected
                        ? 'bg-black text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-sm'
                        : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900/80 dark:hover:text-zinc-100'
                    }`}
                    id={`legal-nav-${item.id}`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto px-6 py-6 md:px-8 space-y-6">
              {/* Mobile navbar switcher */}
              <div className="flex md:hidden flex-wrap gap-1.5 border-b border-zinc-100 pb-4 dark:border-zinc-900">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id as SubPageType)}
                    className={`rounded-md px-2.5 py-1.5 text-[10px] font-bold transition-all cursor-pointer ${
                      activePage === item.id
                        ? 'bg-black text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-xs'
                        : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200/60 hover:text-zinc-900 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 font-semibold'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {renderContent()}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
