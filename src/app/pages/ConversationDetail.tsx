import { ArrowLeft, Tag, Copy, Download, MoreVertical } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Link } from "react-router";

const mockConversation = {
  id: "conv_1",
  title: "Mobile navigation redesign with accessibility focus",
  model: "Claude 3.5 Sonnet",
  project: "Mobile App Redesign",
  createdAt: "2026-03-26T09:30:00Z",
  tags: ["ui-design", "accessibility", "react"],
  turns: [
    {
      id: "turn_1",
      role: "user",
      content: "I need to redesign the mobile navigation to be more accessible. The current hamburger menu doesn't work well with screen readers and keyboard navigation. Can you help me think through a better approach?",
      timestamp: "2026-03-26T09:30:00Z",
      isOpening: true,
    },
    {
      id: "turn_2",
      role: "assistant",
      content: "I'd be happy to help you design a more accessible mobile navigation. Let's break this down into key considerations:\n\n1. **Screen Reader Support**\n   - Proper ARIA labels and roles\n   - Semantic HTML structure\n   - Clear focus indicators\n\n2. **Keyboard Navigation**\n   - Tab order management\n   - Escape key to close menus\n   - Arrow keys for menu items\n\n3. **Design Patterns**\n   - Bottom navigation bar (easier thumb reach)\n   - Slide-out drawer with proper focus trap\n   - Expandable sections with chevrons\n\nWhat's your current navigation structure? How many top-level items do you have?",
      timestamp: "2026-03-26T09:30:42Z",
    },
    {
      id: "turn_3",
      role: "user",
      content: "We have 5 main sections: Home, Projects, Team, Resources, and Settings. Right now it's a hamburger menu that slides in from the left. The problem is that when it opens, focus doesn't move to the menu, and there's no way to close it with the keyboard.",
      timestamp: "2026-03-26T09:32:15Z",
    },
    {
      id: "turn_4",
      role: "assistant",
      content: "With 5 main sections, you have a few good options. Let me suggest a bottom navigation bar approach since it solves several problems:\n\n```jsx\nimport { Home, FolderKanban, Users, BookOpen, Settings } from 'lucide-react';\n\nconst MobileNav = () => {\n  const [activeTab, setActiveTab] = useState('home');\n  \n  const navItems = [\n    { id: 'home', label: 'Home', icon: Home },\n    { id: 'projects', label: 'Projects', icon: FolderKanban },\n    { id: 'team', label: 'Team', icon: Users },\n    { id: 'resources', label: 'Resources', icon: BookOpen },\n    { id: 'settings', label: 'Settings', icon: Settings },\n  ];\n\n  return (\n    <nav \n      role=\"navigation\" \n      aria-label=\"Main navigation\"\n      className=\"fixed bottom-0 left-0 right-0 bg-white border-t\"\n    >\n      <div className=\"flex justify-around\">\n        {navItems.map((item) => (\n          <button\n            key={item.id}\n            onClick={() => setActiveTab(item.id)}\n            className={`flex flex-col items-center py-2 px-3 ${\n              activeTab === item.id ? 'text-blue-600' : 'text-gray-600'\n            }`}\n            aria-label={item.label}\n            aria-current={activeTab === item.id ? 'page' : undefined}\n          >\n            <item.icon className=\"h-6 w-6\" aria-hidden=\"true\" />\n            <span className=\"text-xs mt-1\">{item.label}</span>\n          </button>\n        ))}\n      </div>\n    </nav>\n  );\n};\n```\n\nKey accessibility features:\n- Proper `role` and `aria-label`\n- `aria-current=\"page\"` for active state\n- `aria-hidden` on decorative icons\n- Keyboard accessible by default (native buttons)\n- Large touch targets\n\nWould this work for your use case?",
      timestamp: "2026-03-26T09:33:28Z",
      hasCode: true,
    },
  ],
};

export default function ConversationDetail() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-[rgba(0,0,0,0.08)] bg-white">
        <div className="px-8 py-6">
          <div className="mb-4">
            <Link to="/conversations">
              <Button variant="ghost" size="sm" className="-ml-3">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Conversations
              </Button>
            </Link>
          </div>
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <h1 className="mb-2 text-xl tracking-tight">{mockConversation.title}</h1>
              <div className="flex items-center gap-4 text-[13px] text-[#717182]">
                <span className="font-mono">
                  {new Date(mockConversation.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
                <span>{mockConversation.model}</span>
                <Badge variant="secondary" className="bg-[#F5F5F7]">
                  {mockConversation.project}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Tags */}
          <div className="mt-4 flex items-center gap-2">
            <Tag className="h-3.5 w-3.5 text-[#717182]" />
            <div className="flex items-center gap-2">
              {mockConversation.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="border-[rgba(0,0,0,0.08)] bg-white text-[11px] font-mono"
                >
                  {tag}
                </Badge>
              ))}
              <Button variant="ghost" size="sm" className="h-6 px-2 text-[11px]">
                + Add tag
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Conversation Transcript */}
      <div className="mx-auto max-w-4xl px-8 py-8">
        <div className="space-y-6">
          {mockConversation.turns.map((turn, index) => (
            <div key={turn.id}>
              {/* Turn */}
              <div className={`flex gap-6 ${turn.role === 'assistant' ? 'flex-row-reverse' : ''}`}>
                {/* Role Label */}
                <div className={`w-24 flex-shrink-0 pt-1 ${turn.role === 'assistant' ? 'text-right' : ''}`}>
                  <div className="text-[11px] uppercase tracking-wider text-[#717182]">
                    {turn.role === 'user' ? 'You' : 'Assistant'}
                  </div>
                  <div className="mt-0.5 font-mono text-[11px] text-[#717182]">
                    {new Date(turn.timestamp).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>

                {/* Content */}
                <Card
                  className={`flex-1 border p-5 shadow-sm ${
                    turn.isOpening
                      ? 'border-amber-200 bg-amber-50/30'
                      : turn.role === 'user'
                      ? 'border-[rgba(0,0,0,0.08)] bg-white'
                      : 'border-[rgba(0,0,0,0.08)] bg-[#FAFAFA]'
                  }`}
                >
                  {turn.isOpening && (
                    <div className="mb-3 flex items-center gap-2">
                      <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-200 text-[10px]">
                        OPENING TURN
                      </Badge>
                      <span className="text-[11px] text-[#717182]">
                        Cognitive baseline indicator
                      </span>
                    </div>
                  )}
                  <div className="whitespace-pre-wrap text-[14px] leading-relaxed text-[#3A3A3A]">
                    {turn.content}
                  </div>
                  {turn.hasCode && (
                    <div className="mt-3 rounded-sm bg-[#F5F5F7] px-3 py-2 font-mono text-[11px] text-[#717182]">
                      Code block detected
                    </div>
                  )}
                </Card>
              </div>

              {/* Turn Actions */}
              <div className={`mt-2 flex gap-2 ${turn.role === 'assistant' ? 'flex-row-reverse' : ''}`}>
                <div className="w-24 flex-shrink-0" />
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="h-7 px-2 text-[11px]">
                    <Tag className="mr-1 h-3 w-3" />
                    Tag turn
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 px-2 text-[11px]">
                    <Copy className="mr-1 h-3 w-3" />
                    Copy
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Conversation Metadata Footer */}
        <Card className="mt-12 border border-[rgba(0,0,0,0.08)] bg-white p-6 shadow-sm">
          <div className="mb-3 text-[13px] uppercase tracking-wider text-[#717182]">
            Conversation Metadata
          </div>
          <div className="grid grid-cols-2 gap-4 text-[13px]">
            <div>
              <div className="text-[#717182]">Total Turns</div>
              <div className="font-mono">{mockConversation.turns.length}</div>
            </div>
            <div>
              <div className="text-[#717182]">Upload ID</div>
              <div className="font-mono text-[12px]">upl_1a2b3c4d5e6f</div>
            </div>
            <div>
              <div className="text-[#717182]">Project</div>
              <div>{mockConversation.project}</div>
            </div>
            <div>
              <div className="text-[#717182]">Model</div>
              <div>{mockConversation.model}</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
